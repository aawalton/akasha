import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoName = {
  id: "01a0609f-53f9-7998-8f89-ccf5a230130b",
  pageTypeSlug: "module",
  slug: "eso-name",
  definition: "a name the game gave, with the game's own grammar suffix cut off",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A suffix the game wrote after a caret is cut from the end of the name.",
    },
    {
      invariantKind: "departure",
      statement: "A caret anywhere but the end of the name is left alone.",
    },
  ],
} as const satisfies Module
