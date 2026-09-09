import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchReconcile = {
  id: "01a06865-ecc3-7dce-83d7-64dbed1ee5a2",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-reconcile",
  definition:
    "our copy weighed against what Monarch listed, and what Monarch no longer lists retired",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A row Monarch no longer lists is retired on the fetched window rather than on a missing id.",
    },
    {
      invariantKind: "departure",
      statement: "A reconciliation retiring more than a twentieth of the rows weighed is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is retired where the ceiling is passed rather than the first rows being taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "A window is cut by the day a transaction fell on rather than by the month its page has.",
    },
    {
      invariantKind: "departure",
      statement: "A pending row Monarch no longer lists is cleared.",
    },
    {
      invariantKind: "departure",
      statement: "The scope reconciled against is named in the refusal.",
    },
  ],
} as const satisfies Module
