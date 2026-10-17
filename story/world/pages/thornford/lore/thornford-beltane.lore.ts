import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const thornfordBeltane = {
  id: "01a14b78-74b1-7ecb-98d3-47eab8687d8d",
  type: "page-type/lore",
  slug: "thornford-beltane",
  title: "Beltane",
  world: "world/thornford",
  about: "world/thornford",
  facts: [
    {
      fact: "Beltane falls on the first of May, and is a quarter day.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
    {
      fact: "On Beltane night the moon is full and rises as the sun sets, near nine in the evening.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
    {
      fact: "The Spring Court's Beltane dance runs across the ford from moonrise until dawn.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "At the Beltane dance the Spring Court hands the year to the Summer Court, before every court.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "A mortal crosses the ford on a quarter night only as a fae's guest, led over by the hand.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "Valley folk say a mortal who eats or drinks across the ford never comes home.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/thornford-nala",
        "character-other/thornford-shaestrel",
      ],
    },
    {
      fact: "A mortal who eats or drinks across the ford is held there until the next quarter day.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "A mortal guest who keeps from food and drink comes home at dawn, a night older and no more.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
  ],
  createdAt: "2026-10-17T20:05:47.824Z",
  updatedAt: "2026-10-17T21:56:51.914Z",
} as const satisfies Lore
