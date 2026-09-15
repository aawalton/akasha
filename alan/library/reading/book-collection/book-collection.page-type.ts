import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const bookCollection = {
  id: "01a06807-be66-7002-8260-b13166dc16e1",
  type: "page-type/page-type",
  slug: "book-collection",
  definition: "a shelf of books Alan keeps together",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
