import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiDropMechanics = {
  id: "01a06231-8f1c-7ec0-9f99-9b6132b3a27b",
  type: "page-type/module",
  slug: "sets-core-api-drop-mechanics",
  definition: "how a set drops, named and described in the caller's language",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The same function is published under an upper-case and a lower-case first letter.",
    },
  ],
  createdAt: "2026-09-02T12:56:50.204Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
