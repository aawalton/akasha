import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hollowmereKendal = {
  id: "01a0fdf3-dee5-7cb2-a5d3-77ded2de37ad",
  type: "page-type/place",
  slug: "hollowmere-kendal",
  title: "Kendal",
  world: "world/hollowmere",
  facts: [
    {
      fact: "Kendal is a grey stone market town forty minutes from Hollowmere village by bus.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-shiv",
        "character-other/hollowmere-amara",
        "character-other/hollowmere-penhallow",
      ],
    },
    {
      fact: "Kendal holds a market on Saturdays: fruit, cheese, wool, secondhand books and a charms stall.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-penhallow",
      ],
    },
    {
      fact: "Kendal has a cinema, a bookshop with a café upstairs, and a licensed charm-maker's shop.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-amara",
        "character-other/hollowmere-penhallow",
      ],
    },
    {
      fact: "On Saturdays the Kendal buses are full of Hollowmere students, gowns left behind.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-shiv",
      ],
    },
  ],
} as const satisfies Place
