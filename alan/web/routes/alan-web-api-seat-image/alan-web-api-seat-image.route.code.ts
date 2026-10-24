import {
  type SignedIn,
  signedInAs,
} from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { whereReadBy } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  endingOf,
  imageDeps,
  landImage,
} from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const WRITER = "alanwalton web <web@alanwalton.com>"

const SEAT_PAGE_TYPE_SLUG = "seat"

const SEAT_PARAM = "seat"

const JPG = "jpg"

const BYTES_HELD = 12 * 1024 * 1024

function refusalOf(bytes: Uint8Array): readonly [string, number] | null {
  if (bytes.byteLength === 0) return ["The image holds no bytes.", 400]
  if (bytes.byteLength > BYTES_HELD) return [`An image holds at most ${BYTES_HELD} bytes.`, 413]
  if (endingOf(bytes) !== JPG) return ["An image is sent as jpg bytes.", 415]
  return null
}

async function seatRefusal(
  user: SignedIn,
  seat: string | null
): Promise<readonly [string, number] | null> {
  if (seat === null || seat === "") return ["An image is kept for a seat named by its id.", 400]
  const held = await whereReadBy(user, SEAT_PAGE_TYPE_SLUG, { id: { is: seat } })
  if ("refused" in held) return [held.refused, 403]
  const seats = await askingFor({
    pageTypeSlug: SEAT_PAGE_TYPE_SLUG,
    where: held.where,
    keys: ["id"],
    limit: 1,
  })
  if ("refused" in seats) return [seats.refused, 503]
  if (seats.rows.length === 0) return [`no seat the sender may read has the id \`${seat}\``, 404]
  return null
}

async function kept(
  request: Request
): Promise<readonly [string, number] | { readonly image: string }> {
  if (request.method !== "POST") return ["method-not-allowed", 405]
  const signedIn = await signedInAs(request)
  if (signedIn === null) return ["Not authenticated.", 401]
  const denied = await seatRefusal(signedIn, new URL(request.url).searchParams.get(SEAT_PARAM))
  if (denied !== null) return denied
  const bytes = new Uint8Array(await request.arrayBuffer())
  const refusal = refusalOf(bytes)
  if (refusal !== null) return refusal
  try {
    return { image: (await landImage(imageDeps(WRITER), bytes, {}, [])).slug }
  } catch (thrown) {
    return [`The image was not kept: ${saidBy(thrown)}`, 503]
  }
}

export async function action({ request }: { request: Request }): Promise<Response> {
  const held = await kept(request)
  if ("image" in held) return Response.json({ ok: true, image: held.image })
  const [error, status] = held
  return Response.json({ ok: false, error }, { status })
}
