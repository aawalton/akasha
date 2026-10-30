import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const fandomCollection = {
  id: "01a06807-be66-7005-98c4-ddf6b3a89ca2",
  type: "page-type/page-type",
  slug: "fandom-collection",
  definition: "a collection that holds fandoms Alan keeps together",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-10-30T15:12:16.525Z",
} as const satisfies PageType
