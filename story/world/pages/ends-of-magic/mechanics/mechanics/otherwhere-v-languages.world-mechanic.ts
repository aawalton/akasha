import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVLanguages = {
  id: "01a0ea04-4a04-7289-bfb6-4ba662aaba1f",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-languages",
  title: "Languages",
  world: "world/ends-of-magic",
  aliases: ["idioms", "sayings", "curses"],
  description: "The tongues and sayings of Davrar's peoples.",
} as const satisfies WorldMechanic
