import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionPlaces = {
  id: "01a060f9-bad1-7202-bef3-dc48b30536e9",
  pageTypeSlug: "module",
  slug: "dungeon-champion-places",
  definition: "every champion position gathered, reached by zone name or by map id",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The byte ceiling is why the zones arrive in two groups rather than in a single table.",
    },
    {
      invariantKind: "constraint",
      statement: "The groups are spread in the order the source table held the zones.",
    },
    {
      invariantKind: "gap",
      statement:
        "A zone named in both groups would lose the earlier group's entries without a word.",
    },
  ],
} as const satisfies Module
