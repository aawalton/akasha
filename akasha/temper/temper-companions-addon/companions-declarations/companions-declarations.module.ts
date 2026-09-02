import type { Module } from "@akasha/code-system/module"

export const companionsDeclarations = {
  id: "01a0611d-84d2-747f-a8f3-8583631f2ced",
  pageTypeSlug: "module",
  slug: "companions-declarations",
  definition: "the game and sibling add-on names this add-on reaches without importing them",
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
      statement: "A name the game or a sibling add-on keeps outside akasha is restated here.",
    },
  ],
} as const satisfies Module
