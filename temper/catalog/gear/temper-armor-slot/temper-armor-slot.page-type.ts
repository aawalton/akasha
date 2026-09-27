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
    { pageProperty: "number-property/hash-place", required: true, many: false },
    { pageProperty: "relation-property/slot-equip-type", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An armor slot's hash place is the order a build hash writes the slots in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An armor slot links the equip type the game gives a piece worn there.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
