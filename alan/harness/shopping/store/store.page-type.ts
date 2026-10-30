import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const store = {
  id: "01a15446-0f0c-72c9-8820-8c68f0f6801b",
  type: "page-type/page-type",
  slug: "store",
  definition: "a place where Alan buys things",
  extends: ["page-type/page"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-19T13:07:19.947Z",
  updatedAt: "2026-10-30T16:00:04.616Z",
} as const satisfies PageType
