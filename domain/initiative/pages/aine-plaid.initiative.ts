import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const ainePlaid = {
  id: "01a1544a-f033-7389-9771-2b068d0e6212",
  type: "page-type/initiative",
  slug: "aine-plaid",
  domain: "domain/monarch",
  persona: "persona/aine",
  intentStack: [
    {
      statement: "Monarch has every posted Citi row that `akasha plaid check citi` names.",
      workingMemory:
        "The check names three. Citi credited back two disputed charges Monarch kept: +0.99 Habit Technologies on 2025-08-07 and +458.66 Airbnb on 2026-04-13. Disney+ -21.48 of 2026-08-08 is a pending row stuck on closed card 1425, Monarch id 251555381671500768, and never posted. Plaid keys are in sops beside plaid-item/citi; the Trial plan links ten banks for life.",
    },
  ],
  createdAt: "2026-10-19T13:12:39.730Z",
  updatedAt: "2026-10-19T14:22:47.351Z",
} as const satisfies Initiative
