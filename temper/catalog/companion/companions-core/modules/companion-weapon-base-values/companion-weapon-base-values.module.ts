import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionWeaponBaseValues = {
  id: "01a06110-abe5-75a6-8700-8961742e6d8b",
  type: "page-type/module",
  slug: "companion-weapon-base-values",
  definition: "the damage a companion weapon does before any quality or trait is applied",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon's damage is read from the quality page it belongs to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon's category is read from its weapon type page.",
    },
  ],
} as const satisfies Module
