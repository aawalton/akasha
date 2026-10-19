import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const store = {
  id: "01a15446-0f0c-72c9-8820-8c68f0f6801b",
  type: "page-type/page-type",
  slug: "store",
  definition: "a shop Alan buys things at",
  extends: ["page-type/page"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-19T13:07:19.947Z",
  updatedAt: "2026-10-19T13:07:19.947Z",
} as const satisfies PageType
