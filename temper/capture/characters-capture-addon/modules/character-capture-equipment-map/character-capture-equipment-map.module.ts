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
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon type's place is compiled in from the weapon type pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game weapon type no weapon type page states takes the no-type page's place.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game answers the invalid search category for the Prismatic Recovery jewelry glyph.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A jewelry glyph the game files under the invalid category takes Prismatic Recovery's place.",
    },
  ],
  createdAt: "2026-09-02T09:20:22.413Z",
  updatedAt: "2026-10-20T12:26:11.430Z",
} as const satisfies Module
