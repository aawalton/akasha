import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVGlowfern = {
  id: "01a0ea08-ddd3-7782-80d0-43b44877984d",
  type: "page-type/lore",
  slug: "otherwhere-v-glowfern",
  title: "Glowfern",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-glowfern",
  facts: [
    {
      fact: "Glowfern is a knee-high feathery fern, blue-green, carpeting damp ground under scalebarks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Glowfern pollen glows green for a few breaths when brushed loose at dusk or night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Glowfern grows thickest at Fern Hollow and in other damp hollows of the Greyscale Wood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Autumn glowfern fronds are tough and bitter, and eaten they bring stomach cramps.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Young glowfern fiddleheads in spring are safe to eat boiled.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dried glowfern fronds make soft bedding that keeps fleas away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A heap of cut glowfern gives some warmth as a bed or cover on a cold night.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
