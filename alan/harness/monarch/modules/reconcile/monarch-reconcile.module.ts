import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchReconcile = {
  id: "01a06865-ecc3-7dce-83d7-64dbed1ee5a2",
  type: "page-type/module",
  slug: "monarch-reconcile",
  definition: "how code removes each Monarch transaction Monarch removes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row Monarch no longer lists is retired on the fetched window rather than on a missing id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reconciliation retiring more than a twentieth of the rows weighed is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nothing is retired where the ceiling is passed rather than the first rows being taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window is cut by the day a transaction fell on rather than by the month its page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pending row Monarch no longer lists is cleared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scope reconciled against is named in the refusal.",
    },
  ],
  createdAt: "2026-09-03T17:51:45.347Z",
  updatedAt: "2026-10-30T15:43:40.971Z",
} as const satisfies Module
