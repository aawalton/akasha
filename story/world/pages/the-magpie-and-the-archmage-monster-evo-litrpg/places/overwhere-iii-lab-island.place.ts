import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiLabIsland = {
  id: "01a0ed31-c668-73c7-9ce7-989024ba09a4",
  type: "page-type/place",
  slug: "overwhere-iii-lab-island",
  title: "The Sunken Lab Island",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-the-merfolk-city",
      way: "A swim back through the sea to the merfolk city.",
    },
  ],
  facts: [
    {
      fact: "A small tropical island near the merfolk city once held a building on a central hill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The island was smaller than Seabloom Island and hard to reach.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merfolk scouts took it for a human settlement.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A shimmering fence kept out the corrupted sea beasts that skulked about its shores.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The island has sunk beneath the waves; underwater caves remain below its site.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No new corruption has troubled the sea since it sank.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
