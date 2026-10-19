import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const ainePlaid = {
  id: "01a1544a-f033-7389-9771-2b068d0e6212",
  type: "page-type/initiative",
  slug: "aine-plaid",
  domain: "domain/monarch",
  persona: "persona/aine",
  intentStack: [
    {
      statement: "Alan reads his accounts from Plaid directly, on keys of his own.",
      workingMemory:
        "Plaid's free Trial plan, at dashboard.plaid.com/trial-plan, gives Production with no company, every OAuth bank, and 10 Items for life; removing an Item frees none. Applying for other Production access forfeits it. transactions.days_requested is set at /link/token/create, maxes at 730 and is fixed after Link, so every Link asks 730. A Production redirect URI is HTTPS and listed on the Dashboard. Keys go in ~/.secrets.env, as Google OAuth's do.",
    },
    {
      statement: "Monarch has every transaction from both sides of Alan's card replaced for fraud.",
      workingMemory:
        "The likeliest pair is Costco Anywhere Visa by Citi 4898, hidden in Monarch, and 7496, whose account page was first written 2026-09-05. Monarch's createTransaction in monarch-transaction-create writes a manual row on any account with no dedup and no dry run, and updates the balance unless told not to. The amount-and-day-window matching in monarch-amazon-match is the model for checking a Plaid row against Monarch before writing it.",
    },
  ],
  createdAt: "2026-10-19T13:12:39.730Z",
  updatedAt: "2026-10-19T13:15:36.987Z",
} as const satisfies Initiative
