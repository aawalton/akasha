import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperBuffOther = {
  id: "01a05fc5-94cf-702c-9d2a-71e8577501c9",
  type: "page-type/page-type",
  slug: "temper-buff-other",
  definition: "a helpful effect the game names neither Major nor Minor",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/other-buff"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
