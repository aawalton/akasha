import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsSharedData05 = {
  id: "01a06269-29e4-731f-bc85-4fecb8e869a5",
  type: "page-type/module",
  slug: "destinations-shared-data-05",
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
  createdAt: "2026-09-02T13:57:34.308Z",
  updatedAt: "2026-09-22T14:18:53.000Z",
} as const satisfies Module
