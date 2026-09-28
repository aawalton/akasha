import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVEnchanting = {
  id: "01a0e9f6-5822-75da-b38b-3df12678db92",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-enchanting",
  title: "Enchanting",
  world: "world/ends-of-magic",
  aliases: ["enchantments", "enchanted items", "artifice", "wards"],
  description: "The craft of lasting magic in objects and places.",
} as const satisfies WorldMechanic
