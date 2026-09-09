import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchEvidence = {
  id: "01a06866-06f1-7651-b09b-84d76da97cdf",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-evidence",
  definition: "what our copy has about a transaction, read out and never written to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Everything here reads and nothing writes.",
    },
    {
      invariantKind: "departure",
      statement: "A seat may be given this module and nothing else.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transaction is looked up alone or by merchant or by account over a span or by the rows around.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rows around a transaction are drawn from every account rather than only its own.",
    },
    {
      invariantKind: "departure",
      statement: "A merchant is searched by the merchant name and by the bank's own words alike.",
    },
    {
      invariantKind: "departure",
      statement: "How many rows matched is said alongside the rows shown.",
    },
    {
      invariantKind: "departure",
      statement: "A cut list says that list was cut.",
    },
    {
      invariantKind: "departure",
      statement: "A category is called trusted only where the row falls inside the trusted window.",
    },
    {
      invariantKind: "departure",
      statement:
        "An untrusted category is a fact about the row rather than an answer about the row.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Monarch.",
    },
  ],
} as const satisfies Module
