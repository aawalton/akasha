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
    },
  ],
  createdAt: "2026-10-19T13:12:39.730Z",
  updatedAt: "2026-10-19T13:12:39.730Z",
} as const satisfies Initiative
