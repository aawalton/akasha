import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const showCollection = {
  id: "01a06807-be66-7006-8d8a-389b26e79b07",
  type: "page-type/page-type",
  slug: "show-collection",
  definition: "a collection that holds shows Alan keeps together",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-10-30T15:12:40.165Z",
} as const satisfies PageType
