import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const showCollection = {
  id: "01a06807-be66-7006-8d8a-389b26e79b07",
  type: "page-type/page-type",
  slug: "show-collection",
  definition: "a shelf of shows Alan keeps together",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
