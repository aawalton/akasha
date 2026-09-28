import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereFrontier = {
  id: "01a0e9bd-41f0-77fb-bfdd-1b4b5628cc70",
  type: "page-type/place",
  slug: "otherwhere-frontier",
  title: "The Frontier",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-earth",
  facts: [
    {
      fact: "The Frontier is land where the System spawns quests, dungeons, events and challenges.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Every Frontier feature carries a difficulty rating from one to five stars.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Challenge sites often appear as perfect rings of black or gold on the ground.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Frontier monsters are Labyrinth creatures placed there as a taste of what is coming.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Magical weather strikes the Frontier, and the System sometimes sends a courtesy warning.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Regional points of interest are hidden resources a city can claim for mana.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
