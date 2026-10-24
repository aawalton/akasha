import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatPersons = {
  id: "01a16f09-1319-766d-9436-5590bf718c64",
  type: "page-type/module",
  slug: "seat-persons",
  definition: "how code says the persons a seat answers to as one principal",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A principal of several persons is said as their slugs joined by commas.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A principal of one person is said as that person's slug alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The persons a seat states are read as the principal those persons are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating no person reads as no principal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating several persons has no one person.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here imports another seat module.",
    },
  ],
  createdAt: "2026-10-24T17:50:28.120Z",
  updatedAt: "2026-10-24T17:50:28.120Z",
} as const satisfies Module
