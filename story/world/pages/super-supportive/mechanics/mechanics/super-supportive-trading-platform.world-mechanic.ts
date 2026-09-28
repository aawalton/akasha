import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveTradingPlatform = {
  id: "01a0e9f0-3dfb-772c-920f-66fab9702614",
  type: "page-type/world-mechanic",
  slug: "super-supportive-trading-platform",
  title: "Trading platform",
  world: "world/super-supportive",
  aliases: ["pre-affixation trade requests", "a global auction house full of desperate people"],
  description: "The System's worldwide listing of the classes selectees offer in trade.",
} as const satisfies WorldMechanic
