import type { Module } from "@akasha/code-system/module"

export const housingHouseNames = {
  id: "01a06113-b7ce-7b9b-af21-351c6f82669b",
  pageTypeSlug: "module",
  slug: "housing-house-names",
  definition: "the name of every house the game sells, keyed by its house id",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
