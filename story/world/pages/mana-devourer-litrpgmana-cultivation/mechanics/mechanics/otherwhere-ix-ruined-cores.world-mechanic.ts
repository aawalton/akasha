import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxRuinedCores = {
  id: "01a0ea42-4492-7660-ad59-e2378d3783f2",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-ruined-cores",
  title: "Ruined Cores",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["ruined core"],
  description: "A marred beast core, taken from a creature that was once a cursed person.",
} as const satisfies WorldMechanic
