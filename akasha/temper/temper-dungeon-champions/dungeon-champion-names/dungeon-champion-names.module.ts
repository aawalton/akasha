import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionNames = {
  id: "01a060f9-baca-7e73-b37a-1f69b51ac984",
  pageTypeSlug: "module",
  slug: "dungeon-champion-names",
  definition: "the addon's own name and version, and the four keys its map pins answer to",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The pin keys here are the keys LibMapPins and the compass are told.",
    },
  ],
} as const satisfies Module
