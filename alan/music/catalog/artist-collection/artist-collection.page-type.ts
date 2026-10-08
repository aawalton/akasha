import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const artistCollection = {
  id: "01a06807-be66-7007-94ba-493909f3dc58",
  type: "page-type/page-type",
  slug: "artist-collection",
  definition: "a shelf of artists Alan keeps together",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-09-15T15:36:18.000Z",
} as const satisfies PageType
