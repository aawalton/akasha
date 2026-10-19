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
        "Citi is linked, one Item of the Trial plan's ten, and plaid-item/citi holds clientId, secret and accessToken in sops. Hosted Link needs no redirect URI. Plaid's Citi Item has 18 months of history, with the replaced card's rows under 7496. Monarch reads Citi through Finicity and refuses Python's default user agent. No module reads Plaid yet; the reads so far were one-off scripts.",
    },
  ],
  createdAt: "2026-10-19T13:12:39.730Z",
  updatedAt: "2026-10-19T14:14:59.683Z",
} as const satisfies Initiative
