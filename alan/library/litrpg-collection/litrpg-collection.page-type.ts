import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const litrpgCollection = {
  id: "01a06807-be66-700a-962a-c99e0bc93be5",
  type: "page-type/page-type",
  slug: "litrpg-collection",
  definition: "a shelf of litrpg stories Alan keeps together",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
