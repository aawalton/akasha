import type { Module } from "@akasha/code-system/module"

export const addonKeybindsDeclarations = {
  id: "01a0605a-051c-7a7d-a8cc-84d7148798d8",
  pageTypeSlug: "module",
  slug: "addon-keybinds-declarations",
  definition: "the Lua and game names this addon reaches without importing them",
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
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "stopgap",
      statement: "This module restates declarations the game keeps outside akasha.",
    },
  ],
} as const satisfies Module
