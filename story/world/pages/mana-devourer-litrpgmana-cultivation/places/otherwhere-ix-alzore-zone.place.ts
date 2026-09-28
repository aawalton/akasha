import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxAlzoreZone = {
  id: "01a0ea3f-453c-763d-ac2a-3dc691217388",
  type: "page-type/place",
  slug: "otherwhere-ix-alzore-zone",
  title: "The Alzore Zone",
  world: "world/mana-devourer-litrpgmana-cultivation",
  facts: [
    {
      fact: "The Alzore Zone is a D Grade zone of Firrelia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Abominable bulleaters live deep within the Alzore Zone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The biggest bulleater of its habitat was taken from Alzore for Sun City's arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It took four hunters to bag that bulleater, and those were only the ones who died.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hunters go into the Alzore Zone to capture beasts for the arena.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
