import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchRuleDocuments = {
  id: "01a06866-06f1-762e-b1c3-4910e1884927",
  type: "module",
  slug: "monarch-rule-documents",
  definition: "the category rules, read from the pages inside akasha",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rules are TypeScript pages with one file to a rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checkout is read directly rather than the pages system service asked.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "The categorization ring runs under a workstation timer with no pages system service to ask.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The rules are the index's answer for their page type rather than a folder listed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule's body is the index's answer rather than the page file read again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule kind the index answers no page for is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two pages with one slug are refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A code rule decides a category and an agent rule puts the transaction in front of a reader.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A code rule naming no category catches the transaction and leaves that transaction to a person.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent rule with no judgement is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule naming a category that no longer exists is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category is read as the slug alone, whatever page type names it.",
    },
  ],
} as const satisfies Module
