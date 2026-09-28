import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxManaRefinement = {
  id: "01a0ea42-dd75-7f14-bc51-251b0274e24b",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-mana-refinement",
  title: "Mana Refinement",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["refining mana"],
  description: "Turning a larger amount of low-grade mana into a smaller amount of higher grade.",
} as const satisfies WorldMechanic
