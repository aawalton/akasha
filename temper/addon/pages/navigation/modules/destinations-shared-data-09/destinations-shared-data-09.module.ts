import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsSharedData09 = {
  id: "01a06269-29e9-7c0c-8909-2bd573be3b24",
  type: "page-type/module",
  slug: "destinations-shared-data-09",
  definition: "one run of the shared achievement rows by zone, and the stables, docks and portals",
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
