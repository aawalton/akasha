import type { TypeDeclaration } from "../../../code-system/type-declaration/type-declaration.page-type.ts"

export const mapPingDeclarations = {
  id: "01a0620a-a167-72d0-96fa-861039d2e9bf",
  pageTypeSlug: "type-declaration",
  slug: "map-ping-declarations",
  definition: "the Lua and game names this addon reaches without importing them",
  d: "ts",
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
} as const satisfies TypeDeclaration
