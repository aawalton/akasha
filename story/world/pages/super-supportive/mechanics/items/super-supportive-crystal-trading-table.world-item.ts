import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveCrystalTradingTable = {
  id: "01a0e9f4-be67-7070-880f-96ca9eb477fd",
  type: "page-type/world-item",
  slug: "super-supportive-crystal-trading-table",
  title: "Trading table",
  world: "world/super-supportive",
  aliases: ["crystal table"],
  description: "A milky white crystal table that connects selectees to the trading platform.",
} as const satisfies WorldItem
