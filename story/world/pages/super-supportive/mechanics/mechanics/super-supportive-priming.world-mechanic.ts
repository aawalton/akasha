import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportivePriming = {
  id: "01a0e9f8-aa22-74d7-9a95-e4ab5fe07007",
  type: "page-type/world-mechanic",
  slug: "super-supportive-priming",
  title: "Priming",
  world: "world/super-supportive",
  aliases: ["priming spell"],
  description:
    "Preparing the surroundings with an ingredient through a priming spell so a later spell lasts longer.",
} as const satisfies WorldMechanic
