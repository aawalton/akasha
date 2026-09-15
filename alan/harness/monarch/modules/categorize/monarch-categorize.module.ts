import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchCategorize = {
  id: "01a06865-ecc3-728c-8068-f1a0461fa6d7",
  type: "module",
  slug: "monarch-categorize",
  definition: "a category set on one transaction, in Monarch and in our copy alike",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category Monarch takes and reports nothing back for is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category is named by a page that exists.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A Monarch id resolving other than exactly one page is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A transaction no month sidecar carries is refused rather than written to Monarch alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The rule that decided is recorded beside the category rather than left to be inferred.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The row is tagged as machine-touched when its category is set.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Monarch taking a category while no month file moves is refused.",
    },
  ],
} as const satisfies Module
