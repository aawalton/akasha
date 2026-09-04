import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const gameEngine = {
  id: "01a05b71-e543-7017-875a-4f041149fd46",
  pageTypeSlug: "module",
  slug: "game-engine",
  definition: "which engine a game runs on and which of the app's screens draws it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An engine name the code does not know draws the plain screen.",
    },
    {
      invariantKind: "departure",
      statement: "An awen game with no external id draws the plain screen.",
    },
  ],
} as const satisfies Module
