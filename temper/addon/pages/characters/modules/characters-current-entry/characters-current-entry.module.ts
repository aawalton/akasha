import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersCurrentEntry = {
  id: "01a062d2-92a3-7002-91a3-58a915f7ea72",
  type: "page-type/module",
  slug: "characters-current-entry",
  definition: "the saved table row of the character now played, or nothing where the game has none",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Which row the character now played is kept in is worked out in one place.",
    },
  ],
  createdAt: "2026-09-02T15:52:42.403Z",
  updatedAt: "2026-09-21T17:05:12.000Z",
} as const satisfies Module
