import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsConstSettypeNames = {
  id: "01a0c511-f9c4-7892-ae93-05426ccf3899",
  type: "page-type/module",
  slug: "sets-const-settype-names",
  definition: "the name each kind of gear set has in eight languages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is keyed by the set type global and then by the two-letter language.",
    },
  ],
  createdAt: "2026-09-21T17:44:44.740Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
