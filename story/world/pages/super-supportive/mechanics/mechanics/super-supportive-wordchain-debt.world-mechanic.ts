import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveWordchainDebt = {
  id: "01a0e9f1-065f-74e8-858f-951e71710140",
  type: "page-type/world-mechanic",
  slug: "super-supportive-wordchain-debt",
  title: "Wordchain debt",
  world: "world/super-supportive",
  aliases: ["blowback", "snap back", "paying my dues"],
  description:
    "The owed sacrifice half of a wordchain, repaid later or snapping back on its own terms.",
} as const satisfies WorldMechanic
