import type { Module } from "@akasha/code-system/module"

export const customMenuDeclarations = {
  id: "01a0605a-5821-7b02-b676-e51f8c7d07ac",
  pageTypeSlug: "module",
  slug: "custom-menu-declarations",
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
