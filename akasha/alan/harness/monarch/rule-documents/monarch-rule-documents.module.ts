import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchRuleDocuments = {
  id: "01a06866-06f1-762e-b1c3-4910e1884927",
  pageTypeSlug: "module",
  slug: "monarch-rule-documents",
  definition: "the category rules, read from the pages standing inside akasha",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules stand as TypeScript pages, one file to a rule.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checkout is read directly rather than the pages system service asked, because the ring runs under a workstation timer where no service stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule folder that is not there is refused, because answering with no rules would categorize nothing and report nothing wrong.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule folder that has emptied is refused, because that is a migration half-done rather than a project with no rules.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two pages carrying one slug are refused, because nothing would say which is the rule.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose body will not load is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A code rule decides a category and an agent rule puts the transaction in front of a reader.",
    },
    {
      invariantKind: "departure",
      statement:
        "An agent rule carrying no judgement is refused, because the judgement is what a reader acts on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule naming a category that no longer stands is refused, because it may have been merged or renamed in Monarch.",
    },
  ],
} as const satisfies Module
