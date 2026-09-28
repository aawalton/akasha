import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwherePrometheanCoalition = {
  id: "01a0e9c5-5f89-7c6c-91ea-e4e1a0145d7f",
  type: "page-type/lore",
  slug: "otherwhere-promethean-coalition",
  title: "The Promethean Coalition",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Promethean Coalition, called Team Earth, is Earth's first faction.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its faction skills are Vital Energy Manipulation and Sense Hostility.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Faction level 2 raises its skill caps from 25 to 50.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its wider alliance, the Planetary Defense Force, links over thirty settlements by portal.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
