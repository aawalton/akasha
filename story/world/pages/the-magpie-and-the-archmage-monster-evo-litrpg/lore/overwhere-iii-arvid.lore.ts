import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiArvid = {
  id: "01a0ed33-8988-71df-ab75-4496a2d5cf3d",
  type: "page-type/lore",
  slug: "overwhere-iii-arvid",
  title: "Arvid",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-arvid",
  facts: [
    {
      fact: "Arvid is the youngest of three mages who troubled Sunvale: gloomy, with dark sunken eyes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is the knowledgeable one, versed in dungeons and the ways of magic items.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He casts shields and ice magic; his wand was snapped in Sunvale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He fled Sunvale bruised, with Walter and Beatrice.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
