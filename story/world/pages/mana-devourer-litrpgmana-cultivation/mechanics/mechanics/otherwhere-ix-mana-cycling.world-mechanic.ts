import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxManaCycling = {
  id: "01a0ea36-0398-7936-a32d-ad4a08943e88",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-mana-cycling",
  title: "Mana Cycling",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["cycling", "compressing mana"],
  description: "Circulating one kind of mana through the body by compressing and releasing it.",
} as const satisfies WorldMechanic
