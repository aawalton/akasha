import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvMillbrookMill = {
  id: "01a0ed2c-931c-719a-a649-9a37d07c1a16",
  type: "page-type/place",
  slug: "overwhere-iv-millbrook-mill",
  title: "Millbrook Mill",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Millbrook Mill is the water mill by the town gate, its wheel turned by the Millbrook.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iv-nala"],
    },
    {
      fact: "The mill is run by the miller Hesper Pell, who grinds grain for the whole vale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mill's main shaft is cracked, and the stones can only turn slowly or not at all.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-garrett-pell",
      ],
    },
    {
      fact: "Harvest grain is backing up in sacks and carts outside the mill.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-garrett-pell",
      ],
    },
    {
      fact: "A new shaft needs a great oak beam and a skilled millwright, neither to be had nearby.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Farmers pay the miller one sack in ten of what she grinds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mill house is stone below and timber above, white with flour dust inside.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
