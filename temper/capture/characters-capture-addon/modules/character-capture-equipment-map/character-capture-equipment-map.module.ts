import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureEquipmentMap = {
  id: "01a0616b-618d-790e-b832-fb5fba674711",
  type: "page-type/module",
  slug: "character-capture-equipment-map",
  definition: "each trait, glyph and weapon type against its place in a build hash",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player armor weight's place is compiled in from the armor weight pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game armor type no weight page states takes the no-weight page's place.",
    },
  ],
} as const satisfies Module
