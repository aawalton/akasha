import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const luaStringContains = {
  id: "01a08e17-f876-773e-b52a-6d8f314fa4fa",
  type: "page-type/module",
  slug: "lua-string-contains",
  definition: "whether one text holds another somewhere inside it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The text looked for is matched as plain text rather than as a Lua pattern.",
    },
  ],
  createdAt: "2026-09-11T01:32:10.742Z",
  updatedAt: "2026-09-21T22:10:28.000Z",
} as const satisfies Module
