import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const isTable = {
  id: "01a08e01-6b05-7023-a79d-f39cedee5996",
  type: "page-type/module",
  slug: "is-table",
  definition: "whether a value the game handed over is a Lua table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only Lua's own `type` tells a table from userdata.",
    },
  ],
  createdAt: "2026-09-11T01:07:32.741Z",
  updatedAt: "2026-09-21T22:10:28.000Z",
} as const satisfies Module
