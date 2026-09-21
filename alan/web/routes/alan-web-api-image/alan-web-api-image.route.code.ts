import { readAlanUser } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { endingOf } from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { lowerUuid } from "akasha/page/name-format/pages/lower-uuid/lower-uuid.name-format.code.ts"
import {
  askingFor,
  filingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const IMAGE_PAGE_TYPE_SLUG = "image"

const BYTES_KEY = "bytes"

const TYPE_OF = { png: "image/png", jpg: "image/jpeg" } as const

const HELD_FOR = "private, max-age=300, must-revalidate"

function ifNoneMatchSatisfied(header: string | null, etag: string): boolean {
  if (header === null) return false
  return header.split(",").some((candidate) => candidate.trim() === etag)
}

async function slugOf(imageId: string): Promise<string | null> {
  const asked = await askingFor({
    pageTypeSlug: IMAGE_PAGE_TYPE_SLUG,
    where: { id: { is: imageId } },
    keys: ["slug"],
  })
  if ("refused" in asked) return null
  const row = asked.rows[0]
  return row === undefined ? null : stringIn(row.slug)
}

export async function loader({
  params,
  request,
}: {
  params: { imageId: string }
  request: Request
}): Promise<Response> {
  const { user, headers } = await readAlanUser(request)
  if (!user) return new Response("Unauthorized", { status: 401, headers })

  const imageId = params.imageId.toLowerCase()
  if (!lowerUuid(imageId)) return new Response("Not Found", { status: 404, headers })

  const slug = await slugOf(imageId)
  if (slug === null) return new Response("Not Found", { status: 404, headers })

  const etag = `"${slug}"`
  headers.set("Cache-Control", HELD_FOR)
  headers.set("ETag", etag)
  if (ifNoneMatchSatisfied(request.headers.get("If-None-Match"), etag)) {
    return new Response(null, { status: 304, headers })
  }

  const held = await filingFor({ pageTypeSlug: IMAGE_PAGE_TYPE_SLUG, slug, key: BYTES_KEY })
  if ("refused" in held) return new Response("Not Found", { status: 404, headers })
  const ending = endingOf(held.bytes)
  if (ending === null) return new Response("Not Found", { status: 404, headers })
  headers.set("Content-Type", TYPE_OF[ending])
  return new Response(held.bytes, { headers })
}
