import { endingOf } from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { slideShows } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/modules/reading/slide-reading.module.code.ts"
import { filingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const IMAGE = "image"

const BYTES = "bytes"

const TYPE_OF = { png: "image/png", jpg: "image/jpeg" } as const

const HELD_FOR = "public, max-age=3600"

const NOT_FOUND = 404

function notFound(): Response {
  return new Response("Not Found", { status: NOT_FOUND })
}

export async function loader({ params }: { params: { slug: string } }): Promise<Response> {
  if (!(await slideShows(params.slug))) return notFound()
  const held = await filingFor({ pageTypeSlug: IMAGE, slug: params.slug, key: BYTES })
  if ("refused" in held) return notFound()
  const ending = endingOf(held.bytes)
  if (ending === null) return notFound()
  return new Response(held.bytes, {
    headers: { "Content-Type": TYPE_OF[ending], "Cache-Control": HELD_FOR },
  })
}
