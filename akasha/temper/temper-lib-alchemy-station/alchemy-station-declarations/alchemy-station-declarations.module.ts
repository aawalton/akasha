import type { Module } from "@akasha/code-system/module"

export const alchemyStationDeclarations = {
  id: "01a06054-98bd-74d6-ada5-bf2c5c9925f0",
  pageTypeSlug: "module",
  slug: "alchemy-station-declarations",
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
