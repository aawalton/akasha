import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsBoolPair = {
  id: "01a0617b-4b74-7947-906e-dc19a68d36b8",
  type: "page-type/module",
  slug: "sets-bool-pair",
  definition: "a two-entry table the game keys by false and by true",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Lua table may be keyed by a boolean.",
    },
  ],
  createdAt: "2026-09-02T09:37:45.332Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
