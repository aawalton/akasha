import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiWinterTeeth = {
  id: "01a0ea80-ba70-7a80-ab21-655cd2d92e5c",
  type: "page-type/place",
  slug: "otherwhere-xi-winter-teeth",
  title: "The Winter Teeth",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-harrakan-remnants",
  facts: [
    {
      fact: "The Winter Teeth is a dragon's lair on the southern coast of the Harrakan Remnants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv beat the dragon of the Winter Teeth about ten years ago and spared its life.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Remnant folk near the Winter Teeth long feared the dragon laired there.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
