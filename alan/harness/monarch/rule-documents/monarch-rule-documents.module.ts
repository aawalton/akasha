import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchRuleDocuments = {
  id: "01a06866-06f1-762e-b1c3-4910e1884927",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-rule-documents",
  definition: "the category rules, read from the pages inside akasha",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules are TypeScript pages with one file to a rule.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout is read directly rather than the pages system service asked.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The categorization ring runs under a workstation timer with no pages system service to ask.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rules are the index's answer for their page type rather than a folder listed.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's body is what the index answers rather than the page file read again.",
    },
    {
      invariantKind: "departure",
      statement: "A rule kind the index answers no page for is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Two pages with one slug are refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A code rule decides a category and an agent rule puts the transaction in front of a reader.",
    },
    {
      invariantKind: "departure",
      statement:
        "A code rule naming no category catches the transaction and leaves it to a person.",
    },
    {
      invariantKind: "departure",
      statement: "An agent rule with no judgement is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A rule naming a category that no longer exists is refused.",
    },
  ],
} as const satisfies Module
