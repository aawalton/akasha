import type { Module } from "@akasha/code-system/module"

export const dataEncodeDeclarations = {
  id: "01a06061-96a2-7ff0-b990-24f829d5b839",
  pageTypeSlug: "module",
  slug: "data-encode-declarations",
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
