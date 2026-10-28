import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const amyInventoryManagement = {
  id: "01a0de52-8e19-7631-aa16-a2d687ef1434",
  type: "page-type/initiative",
  slug: "amy-inventory-management",
  domain: "domain/temper-items",
  persona: "persona/amy",
  intentStack: [
    { statement: "Erin's inventory has room to spare." },
    { statement: "Alan's bank has room to spare." },
    {
      statement:
        "Each category filling Erin's inventory or the bank is handled the way Alan chose for it.",
    },
  ],
  createdAt: "2026-09-26T15:25:47.417Z",
  updatedAt: "2026-10-28T17:42:36.417Z",
} as const satisfies Initiative
