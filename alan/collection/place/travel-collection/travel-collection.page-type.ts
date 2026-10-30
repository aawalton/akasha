import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const travelCollection = {
  id: "01a06807-be66-700e-8f4d-f3b9e45380d1",
  type: "page-type/page-type",
  slug: "travel-collection",
  definition: "a collection that lists places Alan wants to go to",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-10-30T15:17:57.042Z",
} as const satisfies PageType
