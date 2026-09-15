import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const fandomCollection = {
  id: "01a06807-be66-7005-98c4-ddf6b3a89ca2",
  type: "page-type/page-type",
  slug: "fandom-collection",
  definition: "a shelf of fandoms Alan keeps together",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
