import type { Module } from "@akasha/code-system/module"

export const debugLoggerDeclarations = {
  id: "01a06061-408e-786a-b66c-737832c65be6",
  pageTypeSlug: "module",
  slug: "debug-logger-declarations",
  definition: "the Lua and game names this library reaches without importing them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the names the code here reaches are declared.",
    },
    {
      invariantKind: "departure",
      statement: "A file reaching a declared name imports this module for the declaration.",
    },
    {
      invariantKind: "departure",
      statement: "A value is declared with `var` so a second addon declaring the same name merges.",
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
