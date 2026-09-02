import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionPlaces00 = {
  id: "01a060f9-bad3-7a6a-8e9a-486e87bd32c3",
  pageTypeSlug: "module",
  slug: "dungeon-champion-places-00",
  definition: "where the champions of the first fifteen zones are found",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A zone belongs to one group of places alone.",
    },
  ],
} as const satisfies Module
