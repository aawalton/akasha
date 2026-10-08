import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const listenerSet = {
  id: "01a07cd7-ff21-7b3f-a03a-2ca0fd18a8b8",
  type: "page-type/module",
  slug: "listener-set",
  definition: "the callbacks a store tells when the value that store has changes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A subscriber is handed back the call that drops that subscriber.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A store has the value and reaches here only for the callbacks.",
    },
  ],
  createdAt: "2026-09-07T17:08:45.473Z",
  updatedAt: "2026-09-15T18:33:51.000Z",
} as const satisfies Module
