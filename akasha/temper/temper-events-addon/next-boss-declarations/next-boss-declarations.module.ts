import type { Module } from "@akasha/code-system/module"

export const nextBossDeclarations = {
  id: "01a06157-8355-785c-9031-638b16abe0eb",
  pageTypeSlug: "module",
  slug: "next-boss-declarations",
  definition: "the string ids and layout controls this tracker makes for itself",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A string id here is made at load rather than shipped with the game.",
    },
    {
      invariantKind: "departure",
      statement: "A control here is declared by this add-on's own XML document.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "departure",
      statement: "A name the game or a library owns is declared in the shared set instead.",
    },
  ],
} as const satisfies Module
