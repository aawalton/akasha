import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxEnchanting = {
  id: "01a0ea3b-8048-7fd3-ae47-11bb17b67edf",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-enchanting",
  title: "Enchanting and Imbuement",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["enchanting", "imbuement", "imbuing", "enchantments"],
  description: "Setting mana into objects so that they carry magic of their own.",
} as const satisfies WorldMechanic
