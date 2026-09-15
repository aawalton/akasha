import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchMerchantNaming = {
  id: "01a06863-264d-729e-aab5-0dd77d14abc2",
  type: "page-type/module",
  slug: "monarch-merchant-naming",
  definition: "the merchant a transaction's own words name, drawn from the merchant pages",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The vocabulary is one page per merchant rather than one body under a heading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A merchant's value is the page's title and its patterns are the runs of the bank's words.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both the value and the patterns are lowered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The merchant and the statement line are read together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Either the merchant or the statement line names the merchant.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The longest matching pattern wins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page missing a title or its patterns is passed over rather than refusing the whole vocabulary.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "The vocabulary is read once and held.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "A page changed under a running process is not seen.",
    },
  ],
} as const satisfies Module
