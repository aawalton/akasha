import {
  isImageSlug,
  withImages,
} from "akasha/agent/message/modules/attached-images/agent-message-attached-images.module.code.ts"
import { messageNamed } from "akasha/agent/message/modules/naming/agent-message-naming.module.code.ts"
import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
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

const SENT = z.object({
  seat: z.string().min(1),
  body: z.string(),
  images: z.array(z.string().refine(isImageSlug)).max(IMAGES_HELD).default([]),
})

async function unkeptAmong(images: readonly string[]): Promise<Response | null> {
  for (const slug of images) {
    const kept = await askingFor({
      pageTypeSlug: IMAGE_PAGE_TYPE_SLUG,
      where: { slug: { is: slug } },
      keys: ["slug"],
      limit: 1,
    })
    if ("refused" in kept) return refused(kept.refused, 503)
    if (kept.rows.length === 0) return refused(`no image is kept as \`${slug}\``, 404)
  }
  return null
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

async function seatSlugOf(id: string): Promise<string | { readonly refused: string }> {
  const seats = await askingFor({
    pageTypeSlug: SEAT_PAGE_TYPE_SLUG,
    where: { id: { is: id } },
    keys: ["slug"],
    limit: 1,
  })
  if ("refused" in seats) return { refused: seats.refused }
  const slug = textIn(seats.rows[0]?.slug)
  return slug ?? { refused: `no seat has the id \`${id}\`` }
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
  const images = sent.data.images
  const body = withImages(sent.data.body.trim(), images)
  if (body === "") return refused("A message says something or attaches an image.", 400)
  if (body.length > BODY_HOLDS) {
    return refused(`A message holds at most ${BODY_HOLDS} characters.`, 413)
  }

  const from = await senderOf(signedIn.contributor)
  if (typeof from !== "string") return refused(from.refused, 403)
  const to = await seatSlugOf(sent.data.seat)
  if (typeof to !== "string") return refused(to.refused, 404)
  const unkept = await unkeptAmong(images)
  if (unkept !== null) return unkept

  const id = crypto.randomUUID()
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
  if ("refused" in wrote) return refused(wrote.refused, 503)
  return Response.json({ ok: true, message: named })
}
