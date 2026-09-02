import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersMigrations = {
  id: "01a062ed-39de-700d-94f4-00c1960edb12",
  pageTypeSlug: "module",
  slug: "characters-migrations",
  definition:
    "the one-off repairs made to the saved table, each with the version it lifts a domain to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A repair runs once per domain and the version reached is written down.",
    },
    {
      invariantKind: "departure",
      statement: "A domain the saved table gives no version to counts as being at nought.",
    },
  ],
} as const satisfies Module
