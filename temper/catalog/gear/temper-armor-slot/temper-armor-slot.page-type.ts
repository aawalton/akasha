import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperArmorSlot = {
  id: "01a05fd1-d430-78b6-bef0-e0208b62ccf9",
  type: "page-type/page-type",
  slug: "temper-armor-slot",
  definition: "a place on the body a piece of armor is worn",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/armor-slot"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
