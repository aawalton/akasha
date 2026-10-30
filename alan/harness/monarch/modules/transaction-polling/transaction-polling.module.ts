import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transactionPolling = {
  id: "01a0686a-7a57-7bb9-b422-97270e0fa807",
  type: "page-type/module",
  slug: "transaction-polling",
  definition: "how a service writes the Monarch transactions that change into akasha",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every row's stamp in the trusted window is asked of Monarch and compared with our copy's watermark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the rows whose stamp has moved are fetched again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A minute in which nothing changed costs one call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No account is fetched on this path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row naming an account this mirror has not landed is left alone and waits for the daily full run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row naming a category this mirror has not landed keeps the category that row has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row Monarch no longer lists is retired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Retirement is judged against the window that was fetched rather than against a single missing id.",
    },
  ],
  createdAt: "2026-09-03T17:56:43.735Z",
  updatedAt: "2026-10-30T15:42:41.182Z",
} as const satisfies Module
