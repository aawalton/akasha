import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchMerchantNaming = {
  id: "01a06863-264d-729e-aab5-0dd77d14abc2",
  pageTypeSlug: "module",
  slug: "monarch-merchant-naming",
  definition: "the merchant a transaction's own words name, drawn from the merchant pages",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The vocabulary is one page per merchant rather than one body under a heading.",
    },
    {
      invariantKind: "departure",
      statement:
        "A merchant's value is the page's title and its patterns are the runs of the bank's words.",
    },
    {
      invariantKind: "departure",
      statement: "Both the value and the patterns are lowered, so naming is not a matter of case.",
    },
    {
      invariantKind: "departure",
      statement:
        "The merchant and the statement line are read together, so either may name the merchant.",
    },
    {
      invariantKind: "departure",
      statement: "The longest pattern that holds wins, so a narrower page beats a wider one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page missing a title or its patterns is passed over rather than refusing the whole vocabulary.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The vocabulary is read once and held, so a page changed under a running process is not seen.",
    },
  ],
} as const satisfies Module
