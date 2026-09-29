import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvIlsaCrane = {
  id: "01a0ed2d-ba61-71f6-a7e0-91f24cd655ad",
  type: "page-type/lore",
  slug: "overwhere-iv-ilsa-crane",
  title: "Ilsa Crane",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Ilsa Crane is in her late twenties.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Identify shows her as Human LV 14, Clerk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ilsa is clever, bored and ambitious.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She notices talent quickly and wants the Millbrook hall to matter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ilsa is the niece of Reeve Aldous Crane.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She would sponsor a gifted newcomer if it raised the hall's name.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
