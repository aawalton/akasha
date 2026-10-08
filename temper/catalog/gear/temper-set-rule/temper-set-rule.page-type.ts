import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSetRule = {
  id: "01a0e1a3-2f08-76b7-8133-d11fe8bbf220",
  type: "page-type/page-type",
  slug: "temper-set-rule",
  definition: "a rule the game holds every gear set to",
  extends: ["page-type/temper-thing"],
  parts: ["number-property/set-piece-most"],
  properties: [{ pageProperty: "number-property/set-piece-most", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-27T06:52:43.144Z",
  updatedAt: "2026-09-27T06:52:47.000Z",
} as const satisfies PageType
