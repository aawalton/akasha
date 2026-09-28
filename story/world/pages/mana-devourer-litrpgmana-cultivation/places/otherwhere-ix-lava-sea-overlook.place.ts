import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxLavaSeaOverlook = {
  id: "01a0ea42-4003-7152-845f-735603d52059",
  type: "page-type/place",
  slug: "otherwhere-ix-lava-sea-overlook",
  title: "The Lava-Sea Overlook",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-arena-dungeon",
  facts: [
    {
      fact: "The lava-sea overlook is a fence in the arena dungeon that looks out over a sea of lava.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The lava glows orange up through the lower paths, and the air there is hot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Workers and prisoners sit by the fence to talk away from the crowds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
