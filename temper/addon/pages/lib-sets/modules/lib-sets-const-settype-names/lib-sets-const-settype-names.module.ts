import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsConstSettypeNames = {
  id: "01a0c511-f9c4-7892-ae93-05426ccf3899",
  type: "page-type/module",
  slug: "lib-sets-const-settype-names",
  definition: "the name each kind of gear set has in eight languages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is keyed by the set type global and then by the two-letter language.",
    },
  ],
} as const satisfies Module
