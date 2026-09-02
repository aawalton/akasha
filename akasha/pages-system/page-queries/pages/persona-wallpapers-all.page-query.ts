import type { PageQuery } from "../page-query.page-type.ts"

export const personaWallpapersAll = {
  id: "01a063f9-220c-7036-afc4-3f5dd300c180",
  pageTypeSlug: "page-query",
  slug: "persona-wallpapers-all",
  asksOfSlug: "persona-wallpaper",
  keys: ["persona-slug", "image-path", "image-root", "relationship-level", "eso-day", "stage"],
} as const satisfies PageQuery
