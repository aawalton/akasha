import type { Module } from "@akasha/code-system/module"

export const chatMessageDeclarations = {
  id: "01a06060-0d14-7444-bb58-bc727c08228e",
  pageTypeSlug: "module",
  slug: "chat-message-declarations",
  definition: "the Lua and game names this addon reaches without importing them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name the transpiler gives special meaning is declared with that shape.",
    },
    {
      invariantKind: "departure",
      statement: "Only the names the code here reaches are declared.",
    },
    {
      invariantKind: "departure",
      statement: "A file reaching a declared name imports this module for the declaration.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "stopgap",
      statement: "This module restates declarations the game keeps outside akasha.",
    },
  ],
} as const satisfies Module
