import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIvMoney = {
  id: "01a0e9f3-1922-7a50-8942-cd533d2a059f",
  type: "page-type/world-mechanic",
  slug: "otherwhere-iv-money",
  title: "Money and Trade",
  world: "world/beware-of-chicken",
  description:
    "Copper coins, silver and spirit stones, and the goods and work they are traded for.",
} as const satisfies WorldMechanic
