import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXHawkEyes = {
  id: "01a0ea7a-2e19-7d28-a061-a732ef85bc1d",
  type: "page-type/lore",
  slug: "otherwhere-x-hawk-eyes",
  title: "Hawk Eyes",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-hawk-eyes",
  facts: [
    {
      fact: "[Hawk Eyes] runs on a steady stream of mana channelled into the eyes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It zooms the world in, snapping a distant target into crystal clear focus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its rarity has not been shown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clarissa uses it with [Mana Beam] to snipe from afar.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
