import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersMigrations = {
  id: "01a062ed-39de-700d-94f4-00c1960edb12",
  type: "page-type/module",
  slug: "characters-migrations",
  definition:
    "the one-off repairs made to the saved table, each with the version it lifts a domain to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A repair runs once per domain and the version reached is written down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain the saved table gives no version to counts as being at nought.",
    },
  ],
  createdAt: "2026-09-02T16:21:49.150Z",
  updatedAt: "2026-09-21T17:05:12.000Z",
} as const satisfies Module
