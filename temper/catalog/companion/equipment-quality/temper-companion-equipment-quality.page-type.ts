import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionEquipmentQuality = {
  id: "01a05fcd-aed0-75bf-9fe4-d95291c165fb",
  type: "page-type/page-type",
  slug: "temper-companion-equipment-quality",
  definition: "the grade of a piece of companion equipment",
  extends: ["page-type/temper-companion-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "boolean-property/available", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
