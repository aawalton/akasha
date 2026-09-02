import type { Module } from "@akasha/code-system/module"

export const mapPingDeclarations = {
  id: "01a0605f-6264-79e9-9401-9c612c1317fd",
  pageTypeSlug: "module",
  slug: "map-ping-declarations",
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
