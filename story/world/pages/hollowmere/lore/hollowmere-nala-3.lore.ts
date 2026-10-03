import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const hollowmereNala3 = {
  id: "01a101fd-3f70-7f71-905c-77932bb8109a",
  type: "page-type/lore",
  slug: "hollowmere-nala-3",
  title: "Nala, continued",
  world: "world/hollowmere",
  about: "character-player/hollowmere-nala",
  facts: [
    {
      fact: "Nala called a thimble three feet across the bench, again and again, and her head stayed clear.",
      knowers: ["lore-disclosure/game-master", "character-player/hollowmere-nala"],
    },
    {
      fact: "Nala called a thimble the full six feet, twice; the third time her head ached, and she stopped.",
      knowers: ["lore-disclosure/game-master", "character-player/hollowmere-nala"],
    },
    {
      fact: "Nala's focus essay ends: It should remember, if what it remembers is someone being loved.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-kit",
        "character-other/hollowmere-penhallow",
      ],
    },
    {
      fact: "Nala wears Kit's silver ring focus on the third finger of her right hand.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-kit",
        "character-other/hollowmere-bea",
      ],
    },
    {
      fact: "Kit's ring warmed on Nala's finger at once, warmer than silver should, as if it knew her.",
      knowers: ["lore-disclosure/game-master", "character-player/hollowmere-nala"],
    },
    {
      fact: "Reading Nala's last line, Penhallow said: Someone being loved. Hm. Her eyes smiled: Tuesday.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-penhallow",
      ],
    },
    {
      fact: "Nala practised calling a pen, a button and a thimble six feet in the library; the pen was hardest.",
      knowers: ["lore-disclosure/game-master", "character-player/hollowmere-nala"],
    },
  ],
} as const satisfies Lore
