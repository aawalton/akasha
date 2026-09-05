import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchEvidence = {
  id: "01a06866-06f1-7651-b09b-84d76da97cdf",
  pageTypeSlug: "module",
  slug: "monarch-evidence",
  definition: "what our copy holds about a transaction, read out and never written to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Everything here reads and nothing writes, so a seat may be given this module and nothing else.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transaction is looked up on its own, by its merchant, by its account over a span, or by what happened around it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rows around a transaction are drawn from every account rather than only its own, which is how the other leg of a movement between accounts is found.",
    },
    {
      invariantKind: "departure",
      statement: "A merchant is searched by the merchant name and by the bank's own words alike.",
    },
    {
      invariantKind: "departure",
      statement:
        "How many rows matched is said alongside the rows shown, so a cut list says it was cut.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category is called trusted only where the row falls inside the trusted window, and an untrusted category is a fact about the row rather than an answer about it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Monarch.",
    },
  ],
} as const satisfies Module
