import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchCategorize = {
  id: "01a06865-ecc3-728c-8068-f1a0461fa6d7",
  pageTypeSlug: "module",
  slug: "monarch-categorize",
  definition: "a category set on one transaction, in Monarch and in our copy alike",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Only a single transaction update is posted back, and Monarch's own rules engine is never written to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category Monarch takes and reports nothing back for is refused, because nothing confirms the one thing the call was for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category is named by a page that stands, and a Monarch id resolving other than exactly one page is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transaction no month sidecar carries is refused rather than written to Monarch alone.",
    },
    {
      invariantKind: "departure",
      statement: "What decided is recorded beside the category rather than left to be inferred.",
    },
    {
      invariantKind: "departure",
      statement: "The row is tagged as machine-touched when its category is set.",
    },
    {
      invariantKind: "departure",
      statement:
        "Monarch taking a category while no month file moves is refused, because the two would then disagree until the next sync.",
    },
  ],
} as const satisfies Module
