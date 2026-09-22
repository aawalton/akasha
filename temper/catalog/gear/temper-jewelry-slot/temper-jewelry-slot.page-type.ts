import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperJewelrySlot = {
  id: "01a05fd1-d432-7a5c-af26-2d6a3db12c15",
  type: "page-type/page-type",
  slug: "temper-jewelry-slot",
  definition: "a place on the body a piece of jewelry is worn",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/jewelry-slot", "relation-property/jewelry-type"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "relation-property/jewelry-type", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
