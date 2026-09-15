import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const authorCollection = {
  id: "01a06807-be66-7001-8727-30e55aa5e73b",
  type: "page-type/page-type",
  slug: "author-collection",
  definition: "a shelf of authors Alan keeps together",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
