import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQolCompass = {
  id: "01a0611d-84c5-7033-849d-5e422d08a22a",
  type: "page-type/module",
  slug: "companion-qol-compass",
  definition: "turning the companion's compass pin off",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pin is faded by alpha rather than unregistered.",
    },
  ],
} as const satisfies Module
