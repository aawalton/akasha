import type { Module } from "@akasha/code-system/module"

export const alchemyStationCasts = {
  id: "01a06054-98bd-7144-93e7-35c6cd5a2438",
  pageTypeSlug: "module",
  slug: "alchemy-station-casts",
  definition: "what an empty table is read as when the library is first made",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The library is built up field by field after being made empty.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
