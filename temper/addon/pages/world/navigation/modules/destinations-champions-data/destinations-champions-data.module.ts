import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsChampionsData = {
  id: "01a06269-29b6-7812-9d64-d47aa7c8b72d",
  type: "page-type/module",
  slug: "destinations-champions-data",
  definition: "the champion (dolmen and world boss) achievement rows by zone, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
