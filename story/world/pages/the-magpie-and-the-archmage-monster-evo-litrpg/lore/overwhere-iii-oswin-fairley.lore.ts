import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiOswinFairley = {
  id: "01a0fdd2-f70e-7982-a50a-583de05b9790",
  type: "page-type/lore",
  slug: "overwhere-iii-oswin-fairley",
  title: "Oswin Fairley",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-oswin-fairley",
  facts: [
    {
      fact: "The bitten lad's father is Oswin Fairley, forty, stocky and red-faced, slow to speak.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/overwhere-iii-oswin-fairley",
        "character-player/overwhere-iii-nala",
      ],
    },
    {
      fact: "Oswin is a Common, a Farmer of Level 8, and keeps hens, two cows and barley on his farm.",
      knowers: ["lore-disclosure/game-master", "character-other/overwhere-iii-oswin-fairley"],
    },
    {
      fact: "Oswin carries a hay fork when he walks his hedges, and has never fought anything bigger than a rat.",
      knowers: ["lore-disclosure/game-master", "character-other/overwhere-iii-oswin-fairley"],
    },
  ],
} as const satisfies Lore
