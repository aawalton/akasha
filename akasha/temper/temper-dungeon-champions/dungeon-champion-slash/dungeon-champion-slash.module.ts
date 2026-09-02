import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionSlash = {
  id: "01a060f9-badb-75b9-a0c4-24413a5ab8d1",
  pageTypeSlug: "module",
  slug: "dungeon-champion-slash",
  definition: "two slash commands that print where the player is on the open map",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A position prints as hundredths of a percent.",
    },
  ],
} as const satisfies Module
