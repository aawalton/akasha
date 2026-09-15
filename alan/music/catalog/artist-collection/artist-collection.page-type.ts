import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const artistCollection = {
  id: "01a06807-be66-7007-94ba-493909f3dc58",
  type: "page-type",
  slug: "artist-collection",
  definition: "a shelf of artists Alan keeps together",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
