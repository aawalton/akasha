import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvBrennaHolt = {
  id: "01a0f195-67e1-79e1-a379-b85b9043834a",
  type: "page-type/lore",
  slug: "overwhere-iv-brenna-holt",
  title: "Sergeant Brenna Holt",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Brenna Holt is sergeant of the Millbrook watch, thirty-five, square-built, scarred of chin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Identify shows her as Human LV 21, Guard LV 23.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is the watch's only woman, and runs dawn drill when the captain is busy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is blunt and hard on recruits, and fiercely fair; she hates a shirker and a bully.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She would take a new woman recruit into her curtained corner and see her kitted out.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She lost two fingers of her left hand to a goblin blade, and still holds a shield with it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
