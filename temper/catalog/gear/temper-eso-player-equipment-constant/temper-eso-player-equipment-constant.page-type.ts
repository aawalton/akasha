import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperEsoPlayerEquipmentConstant = {
  id: "01a05fd1-d431-793b-8b9a-9cc4a07e31be",
  type: "page-type/page-type",
  slug: "temper-eso-player-equipment-constant",
  definition: "the number the game has for a gear value",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/eso-num",
    "select-property/constant-family",
    "text-property/constant-id",
    "module/eso-player-equipment-constant-pages",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "select-property/constant-family", required: true, many: false },
    { pageProperty: "text-property/constant-id", required: true, many: false },
    { pageProperty: "number-property/eso-num", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
