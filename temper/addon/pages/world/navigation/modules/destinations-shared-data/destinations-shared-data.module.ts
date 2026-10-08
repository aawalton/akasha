import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsSharedData = {
  id: "01a06269-29ed-7b61-af94-d692a43a3bb9",
  type: "page-type/module",
  slug: "destinations-shared-data",
  definition:
    "the shared achievement rows by zone, and the stables, docks and portals, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the sets joined in order.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.317Z",
  updatedAt: "2026-09-22T14:19:07.000Z",
} as const satisfies Module
