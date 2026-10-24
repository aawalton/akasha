import {
  type Attaching,
  isImageSlug,
  withImages,
} from "akasha/agent/message/modules/attached-images/agent-message-attached-images.computed-property-module.code.ts"
import { messageNamed } from "akasha/agent/message/modules/naming/agent-message-naming.module.code.ts"
import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { whereReadBy } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { imageBytes } from "akasha/infrastructure/inference/generation/image/properties/image-bytes.file-property.ts"
import {
  statesVersionSeven,
  uuidVersion7,
} from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { uncommittedBesideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  readingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { z } from "zod"

const MESSAGE_PAGE_TYPE_SLUG = "agent-message"

const SEAT_PAGE_TYPE_SLUG = "seat"

const PERSON_PAGE_TYPE_SLUG = "person"

const WRITER = "alanwalton web <web@alanwalton.com>"

const BODY_HOLDS = 19_999

const IMAGE_PAGE_TYPE_SLUG = "image"

const IMAGES_HELD = 8

const REMEMBERED_MS = 15 * 60_000

type Answer = { readonly status: number; readonly said: Readonly<Record<string, unknown>> }

const answering = new Map<string, { readonly at: number; readonly answer: Promise<Answer> }>()

const SENT = z.object({
  id: z.string().refine(statesVersionSeven).optional(),
  seat: z.string().min(1),
  body: z.string(),
  images: z.array(z.string().refine(isImageSlug)).max(IMAGES_HELD).default([]),
})

const HELD_WITHOUT_ENDING = "png"

async function attachedOf(slug: string): Promise<Attaching | Response> {
  const kept = await askingFor({
    pageTypeSlug: IMAGE_PAGE_TYPE_SLUG,
    where: { slug: { is: slug } },
    keys: ["slug", imageBytes.propertySlug],
    limit: 1,
  })
  if ("refused" in kept) return refused(kept.refused, 503)
  const row = kept.rows[0]
  if (row === undefined) return refused(`no image is kept as \`${slug}\``, 404)
  const read = await readingFor({ pages: [{ pageTypeSlug: IMAGE_PAGE_TYPE_SLUG, slug }] })
  if ("refused" in read) return refused(read.refused, 503)
  const page = read.bodies[0]?.path
  const ending = textIn(row[imageBytes.propertySlug]) ?? HELD_WITHOUT_ENDING
  const bytesAt =
    page === undefined ? null : uncommittedBesideAt(page, imageBytes.propertySlug, ending)
  if (bytesAt === null) return refused(`no page file is kept for \`${slug}\``, 404)
  return { image: slug, bytesAt }
}

async function attachedAmong(images: readonly string[]): Promise<readonly Attaching[] | Response> {
  const attached: Attaching[] = []
  for (const slug of images) {
    const one = await attachedOf(slug)
    if (one instanceof Response) return one
    attached.push(one)
  }
  return attached
}

function refused(error: string, status: number): Response {
  return Response.json({ ok: false, error }, { status })
}

async function senderOf(contributor: string): Promise<string | { readonly refused: string }> {
  const people = await askingFor({
    pageTypeSlug: PERSON_PAGE_TYPE_SLUG,
    keys: ["slug", "contributor"],
  })
  if ("refused" in people) return { refused: people.refused }
  for (const row of people.rows) {
    const named = textIn(row.contributor)
    const slug = textIn(row.slug)
    if (named !== null && slug !== null && slugOf(named) === contributor) return slug
  }
  return { refused: "no person page names the contributor signed in" }
}

type Refused = { readonly refused: string; readonly status: number }

async function seatSlugOf(from: string, id: string): Promise<string | Refused> {
  const held = await whereReadBy({ person: from }, SEAT_PAGE_TYPE_SLUG, { id: { is: id } })
  if ("refused" in held) return { refused: held.refused, status: 403 }
  const seats = await askingFor({
    pageTypeSlug: SEAT_PAGE_TYPE_SLUG,
    where: held.where,
    keys: ["slug"],
    limit: 1,
  })
  if ("refused" in seats) return { refused: seats.refused, status: 503 }
  const slug = textIn(seats.rows[0]?.slug)
  return slug ?? { refused: `no seat \`${from}\` may read has the id \`${id}\``, status: 404 }
}

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") return refused("method-not-allowed", 405)
  const signedIn = await signedInAs(request)
  if (signedIn === null) return refused("Not authenticated.", 401)

  let held: unknown
  try {
    held = await request.json()
  } catch {
    return refused("Invalid request body.", 400)
  }
  const sent = SENT.safeParse(held)
  if (!sent.success) {
    return refused(
      `A message names a seat, carries a body, and attaches at most ${IMAGES_HELD} images by slug.`,
      400
    )
  }
  const said = sent.data.body.trim()
  if (said === "" && sent.data.images.length === 0) {
    return refused("A message says something or attaches an image.", 400)
  }

  const from = await senderOf(signedIn.contributor)
  if (typeof from !== "string") return refused(from.refused, 403)
  const to = await seatSlugOf(from, sent.data.seat)
  if (typeof to !== "string") return refused(to.refused, to.status)
  const attached = await attachedAmong(sent.data.images)
  if (attached instanceof Response) return attached
  const body = withImages(said, attached)
  if (body.length > BODY_HOLDS) {
    return refused(`A message holds at most ${BODY_HOLDS} characters.`, 413)
  }

  const answer = await writtenOnce(sent.data.id ?? uuidVersion7(), from, to, body)
  return Response.json(answer.said, { status: answer.status })
}

async function written(id: string, from: string, to: string, body: string): Promise<Answer> {
  const named = messageNamed(id)
  const wrote = await writingFor({
    writer: WRITER,
    message: `${from} sends the ${to} seat a message from its page`,
    pages: [
      {
        pageTypeSlug: MESSAGE_PAGE_TYPE_SLUG,
        slug: named,
        values: {
          id,
          slug: named,
          to: namedAs(SEAT_PAGE_TYPE_SLUG, to, null),
          from,
          warrant: "announce",
          body: `${body}\n`,
        },
      },
    ],
  })
  if ("refused" in wrote) return { status: 503, said: { ok: false, error: wrote.refused } }
  return { status: 200, said: { ok: true, message: named } }
}

function writtenOnce(id: string, from: string, to: string, body: string): Promise<Answer> {
  const now = Date.now()
  for (const [key, one] of answering) if (now - one.at > REMEMBERED_MS) answering.delete(key)
  const key = `${from} ${id}`
  const held = answering.get(key)
  if (held !== undefined) return held.answer
  const answer = written(id, from, to, body).then(
    (said) => {
      if (said.status !== 200) answering.delete(key)
      return said
    },
    (cause: unknown) => {
      answering.delete(key)
      throw cause
    }
  )
  answering.set(key, { at: now, answer })
  return answer
}
