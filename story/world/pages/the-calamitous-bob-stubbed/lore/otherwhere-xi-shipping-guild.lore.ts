import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiShippingGuild = {
  id: "01a0ea89-f42d-74a9-a9e9-d04f38005a22",
  type: "page-type/lore",
  slug: "otherwhere-xi-shipping-guild",
  title: "The Shipping Guild",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-shipping-guild",
  facts: [
    {
      fact: "The shipping guild licenses approved captains on the river Shal and the sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shipping guild collects gang dues and keeps its own hotels.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The guild keeps walled outpost villages along the Shal where the northern tongue is spoken.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The guild lets pirates take cargo, then sends its recovery division after them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The shipping guild keeps its own assassins.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The guild holds the lost art of core-driven arcane ships of Shadowland design.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
