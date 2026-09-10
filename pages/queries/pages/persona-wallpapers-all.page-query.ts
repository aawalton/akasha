import type { PageQuery } from "../page-query.page-type.types.ts"

export const personaWallpapersAll = {
  id: "01a063f9-220c-7036-afc4-3f5dd300c180",
  pageTypeSlug: "page-query",
  type: "page-query",
  slug: "persona-wallpapers-all",
  asksOfSlug: "persona-wallpaper",
  keys: ["persona", "imagePath", "imageRoot", "relationshipLevel", "esoDay", "stage"],
} as const satisfies PageQuery
