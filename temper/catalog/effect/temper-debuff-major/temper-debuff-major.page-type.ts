import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperDebuffMajor = {
  id: "01a05fc5-94cf-7021-9a7d-21e4794bdc95",
  type: "page-type/page-type",
  slug: "temper-debuff-major",
  definition: "a harmful effect the game names Major",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/major-debuff"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "page-property-entry/effects", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
