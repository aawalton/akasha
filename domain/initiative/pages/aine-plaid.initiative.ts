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
        "The card replaced is Costco Visa 1425, Monarch id 193792761707501659, by 7496, id 254048268518823997; Monarch reads both through Finicity. Plaid's Citi Item keeps 1425's history under 7496. Monarch's 1425 ends 2026-08-08 and 7496 starts 2026-08-19; Plaid rows dated 2026-08-04 to 2026-08-19 are missing. createTransaction writes with no dedup; set shouldUpdateBalance false.",
    },
  ],
  createdAt: "2026-10-19T13:12:39.730Z",
  updatedAt: "2026-10-19T13:40:17.150Z",
} as const satisfies Initiative
