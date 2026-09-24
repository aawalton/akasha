import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  endingOf,
  imageDeps,
  landImage,
} from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"

const WRITER = "alanwalton web <web@alanwalton.com>"

const JPG = "jpg"

const BYTES_HELD = 12 * 1024 * 1024

function refusalOf(bytes: Uint8Array): readonly [string, number] | null {
  if (bytes.byteLength === 0) return ["The image holds no bytes.", 400]
  if (bytes.byteLength > BYTES_HELD) return [`An image holds at most ${BYTES_HELD} bytes.`, 413]
  if (endingOf(bytes) !== JPG) return ["An image is sent as jpg bytes.", 415]
  return null
}

async function kept(
  request: Request
): Promise<readonly [string, number] | { readonly image: string }> {
  if (request.method !== "POST") return ["method-not-allowed", 405]
  if ((await signedInAs(request)) === null) return ["Not authenticated.", 401]
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
