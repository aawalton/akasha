import {
  TYPING,
  typingAfter,
  typingIn,
} from "akasha/agent/seat/modules/typing/seat-typing.module.code.tsx"
import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import {
  refused,
  seatPathOf,
  seatSlugOf,
  senderOf,
} from "akasha/alan/web/modules/seat-message-asking/seat-message-asking.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  askingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { person } from "akasha/person/person.page-type.ts"
import { z } from "zod"

const SEAT_PAGE_TYPE_SLUG = "seat"

const WRITER = "alanwalton web <web@alanwalton.com>"

const TOLD = z.object({ seat: z.string().min(1), typing: z.boolean() })

async function senderIn(request: Request): Promise<string | Response> {
  const signedIn = await signedInAs(request)
  if (signedIn === null) return refused("Not authenticated.", 401)
  const from = await senderOf(signedIn.contributor)
  return typeof from === "string" ? from : refused(from.refused, 403)
}

export async function loader({ request }: { request: Request }): Promise<Response> {
  const from = await senderIn(request)
  if (from instanceof Response) return from
  return Response.json({ ok: true, person: from })
}

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") return refused("method-not-allowed", 405)
  const from = await senderIn(request)
  if (from instanceof Response) return from
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return refused("Invalid request body.", 400)
  }
  const told = TOLD.safeParse(body)
  if (!told.success) return refused("A heartbeat names a seat and whether its sender types.", 400)
  const { seat, typing } = told.data
  const slug = await seatSlugOf(from, seat)
  if (typeof slug !== "string") return refused(slug.refused, slug.status)
  const asked = await askingFor({
    pageTypeSlug: SEAT_PAGE_TYPE_SLUG,
    where: { id: { is: seat } },
    keys: [TYPING],
    limit: 1,
  })
  if ("refused" in asked) return refused(asked.refused, 503)
  const held = typingIn(asked.rows[0]?.[TYPING])
  const named = namedAs(person.slug, from, null)
  if (!typing && !held.some((one) => one.person === named)) return Response.json({ ok: true })
  const path = await seatPathOf(slug)
  if (path === null) return refused(`no page is read for the seat \`${slug}\``, 503)
  const wrote = await writingFor({
    writer: WRITER,
    message: `${from} ${typing ? "types" : "stops typing"} to the ${slug} seat`,
    kept: [{ path, values: { [TYPING]: typingAfter(held, named, typing, Date.now()) } }],
  })
  if ("refused" in wrote) return refused(wrote.refused, 503)
  return Response.json({ ok: true })
}
