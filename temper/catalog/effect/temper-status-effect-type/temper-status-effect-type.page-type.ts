import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperStatusEffectType = {
  id: "01a05fc5-94d1-7ae2-b16f-ba2a9dd2c0a7",
  type: "page-type/page-type",
  slug: "temper-status-effect-type",
  definition: "a kind of condition a hit leaves on its target",
  extends: ["page-type/temper-catalog-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  parts: ["change-generator/status-effect-type-ids-keeping", "data-table/status-effect-type-ids"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:39:39.345Z",
  updatedAt: "2026-09-27T02:34:37.000Z",
} as const satisfies PageType
