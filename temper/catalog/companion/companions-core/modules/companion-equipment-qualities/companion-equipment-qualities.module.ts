import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEquipmentQualities = {
  id: "01a06108-0766-785a-9dd2-ef09e0ab69e2",
  type: "page-type/module",
  slug: "companion-equipment-qualities",
  definition: "every grade of a piece of companion equipment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A quality's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A quality moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["COMPANION_EQUIPMENT_QUALITY_DATA"],
} as const satisfies Module
