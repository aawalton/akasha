import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transactionPolling = {
  id: "01a0686a-7a57-7bb9-b422-97270e0fa807",
  type: "module",
  slug: "transaction-polling",
  definition: "the Monarch rows whose update stamp has moved landed into our copy",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every row's stamp in the trusted window is asked of Monarch and compared with our copy's watermark.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the rows whose stamp has moved are fetched again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A minute in which nothing changed costs one call.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No account is fetched on this path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A row naming an account this mirror has not landed is left alone and waits for the daily full run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A row naming a category this mirror has not landed keeps the category that row has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row Monarch no longer lists is retired.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Retirement is judged against the window that was fetched rather than against a single missing id.",
    },
  ],
} as const satisfies Module
