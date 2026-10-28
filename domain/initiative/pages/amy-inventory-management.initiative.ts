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
  constraints: [
    "Gold gear stays as it is until build management is more mature.",
    "Companion gear stays as it is until Alan checks companion kits and roles with the combat simulator.",
    "Companion gear is worked through with Alan before gold gear is.",
  ],
  createdAt: "2026-09-26T15:25:47.417Z",
  updatedAt: "2026-10-28T18:27:41.735Z",
} as const satisfies Initiative
