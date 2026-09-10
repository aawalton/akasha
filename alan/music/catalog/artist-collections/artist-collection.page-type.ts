import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const artistCollection = {
  id: "01a06807-be66-7007-94ba-493909f3dc58",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "artist-collection",
  definition: "a shelf of artists Alan keeps together",
  pluralSlug: "artist-collections",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
