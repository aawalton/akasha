import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const authorCollection = {
  id: "01a06807-be66-7001-8727-30e55aa5e73b",
  type: "page-type/page-type",
  slug: "author-collection",
  definition: "a collection that holds authors",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-10-30T15:11:48.394Z",
} as const satisfies PageType
