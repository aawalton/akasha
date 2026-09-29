import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiRunes = {
  id: "01a0ea83-eafb-767a-b6f9-daf7e88bb434",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-runes",
  title: "Runes",
  world: "world/the-calamitous-bob-stubbed",
  description: "A glyph of magic that holds a concept a spell can use.",
  aliases: ["Glyphs", "Sigils"],
} as const satisfies WorldMechanic
