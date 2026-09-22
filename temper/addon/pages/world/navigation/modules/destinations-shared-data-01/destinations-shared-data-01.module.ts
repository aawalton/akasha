import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsSharedData01 = {
  id: "01a06269-29e0-79b3-85c5-1aa35fefd3e7",
  type: "page-type/module",
  slug: "destinations-shared-data-01",
  definition: "a run of the shared achievement rows by zone, and the stables, docks and portals",
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
