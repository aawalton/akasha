import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWeaponSlot = {
  id: "01a05fd1-d442-7dfe-a4bd-c74ac70298ff",
  type: "page-type/page-type",
  slug: "temper-weapon-slot",
  definition: "a hand or a bar holding a weapon",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/weapon-slot"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "number-property/equip-type", required: true, many: false },
    { pageProperty: "relation-property/slot-equip-type", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon slot states the equip type the game gives a piece only that slot takes.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
