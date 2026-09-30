import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiGarrickDole = {
  id: "01a0f373-b33c-7922-9247-89036b2d3958",
  type: "page-type/lore",
  slug: "overwhere-iii-garrick-dole",
  title: "Garrick Dole",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-garrick-dole",
  facts: [
    {
      fact: "Garrick Dole is about sixty, big and white-bearded, a hill shepherd gone gaunt in bed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is a Common, a Herder of Level 14, slow of speech and patient as his sheep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wolf's bite is on his right calf; purple has crept from it past his knee.",
      knowers: ["lore-disclosure/game-master", "character-other/overwhere-iii-garrick-dole"],
    },
    {
      fact: "He sleeps most of the day now, and wakes muddled for a breath before his head clears.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
