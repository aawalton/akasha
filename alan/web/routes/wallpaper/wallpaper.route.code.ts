import type { Query } from "@akasha/pages-service/asking"
import { askingFor, filingFor } from "@akasha/pages-service/calling"
import {
  orderedWallpaperSlugs,
  type PersonaCoverRow,
} from "../../wallpaper-candidates/wallpaper-candidates.module.code.ts"

const PERSONA_PAGE_TYPE_SLUG = "persona"

const WALLPAPER_KEY = "mobileWallpaper"

const A_PNG = "image/png"

const HELD_FOR = "public, max-age=60"

// THE PICTURE COMES OFF THE PERSONA RATHER THAN OUT OF THE OBJECT STORE. A persona's wallpaper is
// a file beside her page, so the ask carries the ending the page states and a second call carries
// the bytes. The ordering is the one it was: most recently messaged first, page id breaking a tie.
const EVERY_PERSONA_WALLPAPER: Query = {
  pageTypeSlug: PERSONA_PAGE_TYPE_SLUG,
  keys: ["id", "slug", WALLPAPER_KEY, "lastMessagedAt"],
}

function asStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

export async function loader(): Promise<Response> {
  const asked = await askingFor(EVERY_PERSONA_WALLPAPER)
  // A REFUSAL IS NOT AN EMPTY WALLPAPER SET. Falling through to the 404 below would tell the
  // caller there is no wallpaper to draw, when what happened is that no wallpaper was read.
  if ("refused" in asked) {
    return new Response(`The personas went unread: ${asked.refused}`, { status: 503 })
  }

  const personaRows: PersonaCoverRow[] = asked.rows.flatMap((row) => {
    const id = asStringOrNull(row.id)
    if (id === null) return []
    return [
      {
        id,
        slug: asStringOrNull(row.slug),
        mobileWallpaper: asStringOrNull(row[WALLPAPER_KEY]),
        lastMessagedAt: asStringOrNull(row.lastMessagedAt),
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
