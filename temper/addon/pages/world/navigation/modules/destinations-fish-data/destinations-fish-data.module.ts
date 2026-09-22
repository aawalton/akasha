import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsFishData = {
  id: "01a06269-29b8-742e-b12a-ee2144c30257",
  type: "page-type/module",
  slug: "destinations-fish-data",
  definition: "the fishing achievement rows by zone, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
