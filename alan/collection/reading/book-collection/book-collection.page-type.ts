import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const bookCollection = {
  id: "01a06807-be66-7002-8260-b13166dc16e1",
  type: "page-type/page-type",
  slug: "book-collection",
  definition: "a collection that holds books",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-10-30T15:12:46.062Z",
} as const satisfies PageType
