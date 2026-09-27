import { mayRead } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import { readAlanUser } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { endingOf } from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { filingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import sharp from "sharp"

const IMAGE_TYPE = { png: "image/png", jpg: "image/jpeg" } as const

const SIZED_TYPE = "image/webp"

const SIZED_QUALITY = 80

const WIDTHS = [160, 320, 480, 640, 960, 1280, 1920] as const

const WIDEST = 1920

const WIDTH_ASKED = "w"

const SIZED_HELD = 64

const sized = new Map<string, Uint8Array<ArrayBuffer>>()

export function snappedWidth(asked: string | null): number | null {
  if (asked === null) return null
  const width = Number(asked)
  if (!Number.isFinite(width) || width <= 0) return null
  return WIDTHS.find((one) => one >= width) ?? WIDEST
}

async function sizedBytes(
  key: string,
  bytes: Uint8Array,
  width: number
): Promise<Uint8Array<ArrayBuffer>> {
  const held = sized.get(key)
  if (held !== undefined) {
    sized.delete(key)
    sized.set(key, held)
    return held
  }
  const made = Uint8Array.from(
    await sharp(bytes)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: SIZED_QUALITY })
      .toBuffer()
  )
  sized.set(key, made)
  if (sized.size > SIZED_HELD) {
    const oldest = sized.keys().next().value
    if (oldest !== undefined) sized.delete(oldest)
  }
  return made
}

const TEXT_TYPE = "text/plain; charset=utf-8"

const BYTES_TYPE = "application/octet-stream"

const HELD_FOR = "private, max-age=60, must-revalidate"

const NAMED_BY_BYTES = "image"

const HELD_FOR_GOOD = "private, max-age=31536000, immutable"

function typeOf(bytes: Uint8Array): string {
  const ending = endingOf(bytes)
  if (ending !== null) return IMAGE_TYPE[ending]
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(bytes)
    return TEXT_TYPE
  } catch {
    return BYTES_TYPE
  }
}

export async function loader({
  params,
  request,
}: {
  params: { pageTypeSlug: string; slug: string; key: string }
  request: Request
}): Promise<Response> {
  const { user, headers } = await readAlanUser(request)
  if (!user) return new Response("Unauthorized", { status: 401, headers })

  const reach = await mayRead(user, params.pageTypeSlug)
  if (!reach.permitted || reach.narrows !== null) {
    return new Response("Forbidden", { status: 403, headers })
  }

  const width =
    params.pageTypeSlug === NAMED_BY_BYTES
      ? snappedWidth(new URL(request.url).searchParams.get(WIDTH_ASKED))
      : null
  const sizedKey = width === null ? null : `${params.slug}/${params.key}/${width}`
  const already = sizedKey === null ? undefined : sized.get(sizedKey)
  if (sizedKey !== null && already !== undefined) {
    headers.set("X-Content-Type-Options", "nosniff")
    headers.set("Cache-Control", HELD_FOR_GOOD)
    headers.set("Content-Type", SIZED_TYPE)
    headers.set("ETag", `"${sizedKey}"`)
    return new Response(already, { headers })
  }

  const held = await filingFor({
    pageTypeSlug: params.pageTypeSlug,
    slug: params.slug,
    key: params.key,
  })
  if ("refused" in held) return new Response("Not Found", { status: 404, headers })

  headers.set("X-Content-Type-Options", "nosniff")
  headers.set("Cache-Control", params.pageTypeSlug === NAMED_BY_BYTES ? HELD_FOR_GOOD : HELD_FOR)
  if (sizedKey !== null && width !== null && endingOf(held.bytes) !== null) {
    headers.set("Content-Type", SIZED_TYPE)
    headers.set("ETag", `"${sizedKey}"`)
    return new Response(await sizedBytes(sizedKey, held.bytes, width), { headers })
  }
  headers.set("Content-Type", typeOf(held.bytes))
  return new Response(held.bytes, { headers })
}
