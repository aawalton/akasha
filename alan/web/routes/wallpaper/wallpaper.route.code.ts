import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { endingOf } from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import type { Query } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  askingFor,
  filingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  orderedWallpaperSlugs,
  type WallpaperRow,
} from "akasha/persona/modules/wallpaper-order/wallpaper-order.module.code.ts"

const PERSONA_PAGE_TYPE_SLUG = "persona"

const WALLPAPER_KEY = "mobileWallpaper"

const IMAGE_PAGE_TYPE_SLUG = "image"

const IMAGE_OPENS = `${IMAGE_PAGE_TYPE_SLUG}/`

const BYTES_KEY = "bytes"

const TYPE_OF = { png: "image/png", jpg: "image/jpeg" } as const

const HELD_FOR = "public, max-age=60"

const EVERY_PERSONA_WALLPAPER: Query = {
  pageTypeSlug: PERSONA_PAGE_TYPE_SLUG,
  keys: ["id", "slug", WALLPAPER_KEY, "lastMessagedAt"],
}

export async function loader(): Promise<Response> {
  const asked = await askingFor(EVERY_PERSONA_WALLPAPER)
  if ("refused" in asked) {
    return new Response(`The personas went unread: ${asked.refused}`, { status: 503 })
  }

  const personaRows: WallpaperRow[] = asked.rows.flatMap((row) => {
    const id = stringIn(row.id)
    if (id === null) return []
    return [
      {
        id,
        slug: stringIn(row.slug),
        wallpaper: stringIn(row[WALLPAPER_KEY]),
        lastMessagedAt: stringIn(row.lastMessagedAt),
      },
    ]
  })

  const wallpaperOf = new Map(personaRows.map((row) => [row.slug, row.wallpaper]))
  for (const slug of orderedWallpaperSlugs(personaRows)) {
    const address = wallpaperOf.get(slug)
    if (typeof address !== "string" || !address.startsWith(IMAGE_OPENS)) continue
    const held = await filingFor({
      pageTypeSlug: IMAGE_PAGE_TYPE_SLUG,
      slug: address.slice(IMAGE_OPENS.length),
      key: BYTES_KEY,
    })
    if (!("bytes" in held)) continue
    const ending = endingOf(held.bytes)
    if (ending === null) continue
    return new Response(held.bytes, {
      status: 200,
      headers: { "content-type": TYPE_OF[ending], "cache-control": HELD_FOR },
    })
  }
  return new Response("Not Found", { status: 404 })
}
