import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxCorruptedCores = {
  id: "01a0ea42-4492-7da2-8d7b-410d9dc0ed19",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-corrupted-cores",
  title: "Corrupted Cores",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["corrupted core", "core cleansing"],
  description: "A tainted beast core that must be cleansed before it is safe to affix.",
} as const satisfies WorldMechanic
