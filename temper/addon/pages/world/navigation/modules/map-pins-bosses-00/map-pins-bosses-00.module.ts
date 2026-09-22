import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsBosses00 = {
  id: "01a06269-2a4b-7992-9cb3-9aab9aba8baa",
  type: "page-type/module",
  slug: "map-pins-bosses-00",
  definition: "a set of the world boss places by zone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The set is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
