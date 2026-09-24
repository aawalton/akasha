import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const equipmentQualities = {
  id: "01a060b8-08c6-7141-8b6e-044cf34927d5",
  type: "page-type/module",
  slug: "equipment-qualities",
  definition: "the quality tiers a piece of equipment is made at, from no quality up to mythic",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A quality's place in this table is the index a build hash has.",
    },
  ],
  hashIndexed: ["EQUIPMENT_QUALITY_DATA"],
} as const satisfies Module
