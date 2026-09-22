import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsChampionsData00 = {
  id: "01a06269-29b1-7b29-b8ee-a46bec573c41",
  type: "page-type/module",
  slug: "destinations-champions-data-00",
  definition: "a run of the champion (dolmen and world boss) achievement rows by zone",
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
