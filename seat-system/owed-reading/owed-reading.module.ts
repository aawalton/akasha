import type { Module } from "../../code-system/modules/module.page-type.ts"

export const owedReading = {
  id: "01a069e8-c315-72dc-9375-fc20cf6eb6c2",
  pageTypeSlug: "module",
  slug: "owed-reading",
  definition: "whether a seat owes an act before another seat may take one",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "No row is ever written.",
    },
    {
      invariantKind: "gap",
      statement: "Every seat reads as bound by nothing while the rows stand empty.",
    },
    {
      invariantKind: "departure",
      statement: "The verdict rests on the rows alone.",
    },
    {
      invariantKind: "departure",
      statement: "Which seat is asked about changes no verdict.",
    },
  ],
} as const satisfies Module
