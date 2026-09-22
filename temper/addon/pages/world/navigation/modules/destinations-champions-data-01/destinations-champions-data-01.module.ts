import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsChampionsData01 = {
  id: "01a06269-29b2-77c6-8646-fad9d5832e09",
  type: "page-type/module",
  slug: "destinations-champions-data-01",
  definition: "a set of the champion (dolmen and world boss) achievement rows by zone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
