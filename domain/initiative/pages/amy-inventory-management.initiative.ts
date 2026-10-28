import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const amyInventoryManagement = {
  id: "01a0de52-8e19-7631-aa16-a2d687ef1434",
  type: "page-type/initiative",
  slug: "amy-inventory-management",
  domain: "domain/temper-items",
  persona: "persona/amy",
  intentStack: [
    {
      statement:
        "Each Saturday, Inventory Management counts a character whose items belong and who saw a banker.",
    },
    {
      statement:
        "Buy shortfall buys guild store stacks within the shortfall, at most TTC's suggested price.",
    },
  ],
  createdAt: "2026-09-26T15:25:47.417Z",
  updatedAt: "2026-10-28T17:41:58.442Z",
} as const satisfies Initiative
