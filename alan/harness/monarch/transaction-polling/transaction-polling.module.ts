import type { Module } from "@akasha/code-system/module"

export const transactionPolling = {
  id: "01a0686a-7a57-7bb9-b422-97270e0fa807",
  pageTypeSlug: "module",
  slug: "transaction-polling",
  definition: "the Monarch rows whose update stamp has moved landed into our copy",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The update stamp of every transaction in the trusted window is asked of Monarch and compared against the watermark our copy holds.",
    },
    {
      invariantKind: "departure",
      statement: "Only the rows whose stamp has moved are fetched again.",
    },
    {
      invariantKind: "departure",
      statement: "A minute in which nothing changed costs one call.",
    },
    {
      invariantKind: "absence",
      statement: "No account is fetched on this path.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row naming an account this mirror has not landed is left alone and waits for the daily full run.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming a category this mirror has not landed keeps the category it holds.",
    },
    {
      invariantKind: "departure",
      statement: "A row Monarch no longer lists is retired.",
    },
    {
      invariantKind: "departure",
      statement:
        "Retirement is judged against the window that was fetched rather than against a single missing id.",
    },
  ],
} as const satisfies Module
