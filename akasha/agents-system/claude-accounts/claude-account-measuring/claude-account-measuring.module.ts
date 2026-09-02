import type { Module } from "@akasha/code-system/module"

export const claudeAccountMeasuring = {
  id: "01a05827-314f-7bc0-afb4-1189b872a8fb",
  pageTypeSlug: "module",
  slug: "claude-account-measuring",
  definition: "what each account has spent of its windows, and which one the picker takes next",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every account holding a page is answered.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account is found through the page type reached by its id rather than by a spelled slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "A root naming no claude-account index is refused rather than answered as a fleet of no accounts.",
    },
    {
      invariantKind: "departure",
      statement: "What an account has spent is read from what stands beside its page.",
    },
    {
      invariantKind: "departure",
      statement: "An account whose subscription is withdrawn has spent the whole of both windows.",
    },
    {
      invariantKind: "departure",
      statement: "The account the picker would take next is marked.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account whose access token has lapsed is passed over as the picker passes the account.",
    },
    {
      invariantKind: "departure",
      statement: "Accounts stand in the order their seven-day windows reset.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account that can no longer renew itself is marked with the alias that signs the account back in.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account no window has been read of is marked unread rather than as spending none.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
