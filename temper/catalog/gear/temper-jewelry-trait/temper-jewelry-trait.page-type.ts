import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperJewelryTrait = {
  id: "01a05fd1-d433-7c53-933e-ed171c6f7cf9",
  type: "page-type/page-type",
  slug: "temper-jewelry-trait",
  definition: "a property worked into a piece of jewelry",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-trait-constant-name", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
