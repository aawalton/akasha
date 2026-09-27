import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperPotionCrafted = {
  id: "01a05fd1-d434-76cd-b1db-563c237e6de6",
  type: "page-type/page-type",
  slug: "temper-potion-crafted",
  definition: "a drink brewed from reagents",
  extends: ["page-type/temper-potion"],
  parts: [
    "record-property/recipes",
    "multi-relation-property/recipe-reagents",
    "number-property/encoded-traits",
  ],
  properties: [
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "text-property/item-level", required: true, many: false },
    { pageProperty: "number-property/potion-seconds", required: true, many: false },
    { pageProperty: "record-property/recipes", required: true, many: true, maxCount: null },
    { pageProperty: "number-property/encoded-traits", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
