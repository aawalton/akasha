import type { Query } from "akasha/pages/service/page-asking/page-asking.module.code.ts"
import { askingFor, filingFor } from "akasha/pages/service/page-calling/page-calling.module.code.ts"
import {
  orderedWallpaperSlugs,
  type WallpaperRow,
} from "akasha/personas/wallpaper-order/wallpaper-order.module.code.ts"
import { stringIn } from "akasha/utils/narrow/string-in/string-in.module.code.ts"

const PERSONA_PAGE_TYPE_SLUG = "persona"

const WALLPAPER_KEY = "mobileWallpaper"

const A_PNG = "image/png"

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

  for (const slug of orderedWallpaperSlugs(personaRows)) {
    const held = await filingFor({
      pageTypeSlug: PERSONA_PAGE_TYPE_SLUG,
      slug,
      key: WALLPAPER_KEY,
    })
    if ("bytes" in held) {
      return new Response(held.bytes, {
        status: 200,
        headers: { "content-type": A_PNG, "cache-control": HELD_FOR },
      })
    }
  }
  return new Response("Not Found", { status: 404 })
}
