import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchRuleDocuments = {
  id: "01a06866-06f1-762e-b1c3-4910e1884927",
  type: "page-type/module",
  slug: "monarch-rule-documents",
  definition: "the category rules, read from the pages inside akasha",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rules are TypeScript pages with one file to a rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout is read directly rather than the pages system service asked.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The categorization ring runs under a workstation timer with no pages system service to ask.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The rules are the index's answer for their page type rather than a folder listed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule's body is the index's answer rather than the page file read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule kind the index answers no page for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two pages with one slug are refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A code rule naming no category catches the transaction and leaves that transaction to a person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule naming a category that no longer exists is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category is read as the slug alone, whatever page type names it.",
    },
  ],
} as const satisfies Module
