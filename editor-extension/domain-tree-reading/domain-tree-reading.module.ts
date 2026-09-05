import type { Module } from "../../code-system/modules/module.page-type.ts"

export const domainTreeReading = {
  id: "01a06867-dbcb-7956-a5a6-01ace3eca2d4",
  pageTypeSlug: "module",
  slug: "domain-tree-reading",
  definition: "the checkout a domain tree was composed beside, and the document each row opens",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tree carries the checkout that tree was composed beside.",
    },
    {
      invariantKind: "departure",
      statement: "A row's document is the checkout joined to the path that row carries.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes a tree or reads an answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
