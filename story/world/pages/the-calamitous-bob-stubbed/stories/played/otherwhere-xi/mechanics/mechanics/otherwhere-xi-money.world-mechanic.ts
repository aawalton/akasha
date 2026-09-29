import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiMoney = {
  id: "01a0ea88-1a35-7aa0-b70a-adb10af0e103",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-money",
  title: "Money",
  world: "world/the-calamitous-bob-stubbed",
  description: "Coins of gold, silver and copper.",
} as const satisfies WorldMechanic
