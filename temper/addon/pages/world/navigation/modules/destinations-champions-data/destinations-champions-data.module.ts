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
      statement: "The table is the sets joined in order.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.262Z",
  updatedAt: "2026-09-22T14:17:51.000Z",
} as const satisfies Module
