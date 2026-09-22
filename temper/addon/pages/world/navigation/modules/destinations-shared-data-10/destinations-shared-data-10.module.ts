import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsSharedData10 = {
  id: "01a06269-29ea-7100-9b4f-2fab3809c602",
  type: "page-type/module",
  slug: "destinations-shared-data-10",
  definition: "a set of the shared achievement rows by zone, and the stables, docks and portals",
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
