import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperPotionCrown = {
  id: "01a05fd1-d434-7ce2-a20b-6926bf033e6f",
  type: "page-type/page-type",
  slug: "temper-potion-crown",
  definition: "a drink bought from the crown store",
  extends: ["page-type/temper-potion"],
  properties: [
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/icon", required: true, many: false },
    { pageProperty: "number-property/item-id", required: true, many: false },
    { pageProperty: "text-property/item-level", required: true, many: false },
    { pageProperty: "number-property/potion-seconds", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:53:02.004Z",
  updatedAt: "2026-09-27T03:59:06.000Z",
} as const satisfies PageType
