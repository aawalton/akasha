import type { Module } from "@akasha/code-system/module"

export const housingDeclarations = {
  id: "01a06113-b7cd-7b46-95f4-2fc0f3cd4534",
  pageTypeSlug: "module",
  slug: "housing-declarations",
  definition: "the game and library names this add-on reaches without importing them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the names no other akasha module declares are declared here.",
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
