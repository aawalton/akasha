import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiMardaHesk2 = {
  id: "01a0fea1-2c3b-7390-8b5e-5d92dc31d69d",
  type: "page-type/lore",
  slug: "overwhere-iii-marda-hesk-2",
  title: "Marda Hesk, continued",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-marda-hesk",
  facts: [
    {
      fact: "Nala pressed the specks from Marda's seed stones into her own glimmerstone.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Marda: 'Yours. As I said. The specks too. I wanted them cracked, not back.'",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-marda-hesk",
      ],
    },
    {
      fact: "Marda asked Nala, 'Now. Mind telling me how you crack them that fast?'",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-marda-hesk",
      ],
    },
  ],
} as const satisfies Lore
