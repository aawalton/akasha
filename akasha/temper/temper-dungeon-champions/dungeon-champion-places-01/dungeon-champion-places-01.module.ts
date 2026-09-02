import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionPlaces01 = {
  id: "01a060f9-bad5-78f1-bf68-f430fb092425",
  pageTypeSlug: "module",
  slug: "dungeon-champion-places-01",
  definition: "where the champions of the last sixteen zones are found",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A zone belongs to one group of places alone.",
    },
  ],
} as const satisfies Module
