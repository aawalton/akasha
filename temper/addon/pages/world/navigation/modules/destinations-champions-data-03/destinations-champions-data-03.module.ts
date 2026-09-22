import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsChampionsData03 = {
  id: "01a06269-29b5-7cab-9231-d5f3f847574b",
  type: "page-type/module",
  slug: "destinations-champions-data-03",
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
