import type { Module } from "@akasha/code-system/module"

export const libSetsConstAllDlc = {
  id: "01a061d7-7bc8-7a36-91a7-b3880f734351",
  pageTypeSlug: "module",
  slug: "lib-sets-const-all-dlc",
  definition: "every chapter, DLC and patch the game has shipped, each with its release date",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A DLC's name is read from the game's own collectible and achievement names.",
    },
    {
      invariantKind: "departure",
      statement: "Each DLC id is declared as a game global rather than a member of a table.",
    },
  ],
} as const satisfies Module
