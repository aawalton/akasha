import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersCommands = {
  id: "01a0632d-cacd-700b-99b3-a58078ae9a53",
  pageTypeSlug: "module",
  slug: "characters-commands",
  definition: "the slash commands this add-on answers to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reset empties the saved table before reading the game again.",
    },
  ],
} as const satisfies Module
