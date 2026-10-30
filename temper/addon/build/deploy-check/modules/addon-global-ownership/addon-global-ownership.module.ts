import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonGlobalOwnership = {
  id: "01a06351-9b09-79b9-9375-0365c78e88d8",
  type: "page-type/module",
  slug: "addon-global-ownership",
  definition: "which Lua globals a port's code writes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Assigning to a global table is a write of that name.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Reading a global table is no write.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A local bound at any depth to a global table is a global table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write is read off the syntax rather than off a run.",
    },
  ],
  createdAt: "2026-09-02T18:11:27.625Z",
  updatedAt: "2026-10-30T16:19:42.016Z",
} as const satisfies Module
