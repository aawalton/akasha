import { mayRead } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import { readAlanUser } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { endingOf } from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { filingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const IMAGE_TYPE = { png: "image/png", jpg: "image/jpeg" } as const

const TEXT_TYPE = "text/plain; charset=utf-8"

const BYTES_TYPE = "application/octet-stream"

const HELD_FOR = "private, max-age=60, must-revalidate"

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

  const held = await filingFor({
    pageTypeSlug: params.pageTypeSlug,
    slug: params.slug,
    key: params.key,
  })
  if ("refused" in held) return new Response("Not Found", { status: 404, headers })

  headers.set("Content-Type", typeOf(held.bytes))
  headers.set("X-Content-Type-Options", "nosniff")
  headers.set("Cache-Control", HELD_FOR)
  return new Response(held.bytes, { headers })
}
