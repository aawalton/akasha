import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionArmorSlot = {
  id: "01a05fcd-aece-70c8-8784-e3afaec07950",
  type: "page-type/page-type",
  slug: "temper-companion-armor-slot",
  definition: "a place a companion wears a piece of armor",
  extends: ["page-type/temper-companion-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/equip-type", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
