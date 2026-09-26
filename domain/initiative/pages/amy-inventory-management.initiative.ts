import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const amyInventoryManagement = {
  id: "01a0de52-8e19-7631-aa16-a2d687ef1434",
  type: "page-type/initiative",
  slug: "amy-inventory-management",
  domain: "domain/temper-items",
  persona: "persona/amy",
  intentStack: [
    { statement: "Alan's Tamriel Tome rewards are collected without Alan claiming each one." },
    { statement: "Every reward collected from a Tamriel Tome is handled by the inventory rules." },
    { statement: "Guild trader automation is finished and tested in the game." },
    { statement: "Alan's inventory plan is worked through." },
  ],
} as const satisfies Initiative
