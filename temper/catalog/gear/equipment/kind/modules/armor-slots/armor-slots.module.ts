import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorSlots = {
  id: "01a060b8-08c4-79bd-a673-660169cf2ee9",
  type: "page-type/module",
  slug: "armor-slots",
  definition: "the seven body positions for an armor piece",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An armor slot's place in this table is the index a build hash has.",
    },
  ],
  hashIndexed: ["ARMOR_SLOT_DATA"],
} as const satisfies Module
