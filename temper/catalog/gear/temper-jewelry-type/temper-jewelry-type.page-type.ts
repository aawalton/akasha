import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperJewelryType = {
  id: "01a05fd1-d433-7778-b5e5-05081a435bde",
  type: "page-type/page-type",
  slug: "temper-jewelry-type",
  definition: "a kind of jewelry piece",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "one-of-property/valid-slots", required: true, many: true, maxCount: null },
    { pageProperty: "relation-property/slot-equip-type", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A jewelry type links the equip type the game gives a piece of that type.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:53:02.003Z",
  updatedAt: "2026-09-27T04:24:42.000Z",
} as const satisfies PageType
