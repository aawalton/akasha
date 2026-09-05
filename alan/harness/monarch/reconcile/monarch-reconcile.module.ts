import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchReconcile = {
  id: "01a06865-ecc3-7dce-83d7-64dbed1ee5a2",
  pageTypeSlug: "module",
  slug: "monarch-reconcile",
  definition:
    "our copy weighed against what Monarch listed, and what Monarch no longer lists retired",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A row Monarch no longer lists is retired, judged against the window that was fetched rather than against one missing id.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reconciliation that would retire more than a twentieth of the rows it weighed is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is retired at all where the ceiling is passed, rather than the first rows being taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "A window is cut by the day a transaction fell on rather than by the month its page holds.",
    },
    {
      invariantKind: "departure",
      statement: "A pending row Monarch no longer lists is cleared.",
    },
    {
      invariantKind: "departure",
      statement:
        "The scope reconciled against is named in the refusal, so a run says the scope that run weighed.",
    },
  ],
} as const satisfies Module
