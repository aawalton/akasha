import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersCommand = {
  id: "01a0632d-cacd-700b-99b3-a58078ae9a53",
  type: "page-type/module",
  slug: "characters-command",
  definition: "the slash commands this add-on answers to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset empties the saved table before reading the game again.",
    },
  ],
  createdAt: "2026-09-02T17:32:20.557Z",
  updatedAt: "2026-09-21T17:05:12.000Z",
} as const satisfies Module
