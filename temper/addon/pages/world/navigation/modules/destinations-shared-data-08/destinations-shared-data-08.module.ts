import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsSharedData08 = {
  id: "01a06269-29e8-7080-9990-3ac90341cf71",
  type: "page-type/module",
  slug: "destinations-shared-data-08",
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
  createdAt: "2026-09-02T13:57:34.312Z",
  updatedAt: "2026-09-22T14:20:22.000Z",
} as const satisfies Module
