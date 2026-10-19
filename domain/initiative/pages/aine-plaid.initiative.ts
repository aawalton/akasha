import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const ainePlaid = {
  id: "01a1544a-f033-7389-9771-2b068d0e6212",
  type: "page-type/initiative",
  slug: "aine-plaid",
  domain: "domain/monarch",
  persona: "persona/aine",
  intentStack: [
    { statement: "Alan reads his accounts from Plaid directly, on keys of his own." },
    {
      statement: "Monarch has every transaction from both sides of Alan's card replaced for fraud.",
      workingMemory:
        "The likeliest pair is Costco Anywhere Visa by Citi 4898, hidden in Monarch, and 7496, whose account page was first written 2026-09-05. Monarch's createTransaction in monarch-transaction-create writes a manual row on any account with no dedup and no dry run, and updates the balance unless told not to. The amount-and-day-window matching in monarch-amazon-match is the model for checking a Plaid row against Monarch before writing it.",
    },
  ],
  createdAt: "2026-10-19T13:12:39.730Z",
  updatedAt: "2026-10-19T13:14:52.341Z",
} as const satisfies Initiative
