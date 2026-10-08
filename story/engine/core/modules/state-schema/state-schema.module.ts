import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stateSchema = {
  id: "01a05b71-e544-7bab-8507-5a3ede4ec9a0",
  type: "page-type/module",
  slug: "state-schema",
  definition: "the whole live state of a game at a turn",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "State keeps the keys the schema does not name.",
    },
  ],
  createdAt: "2026-09-01T05:29:46.052Z",
  updatedAt: "2026-09-22T10:07:59.000Z",
} as const satisfies Module
