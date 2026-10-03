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
        "character-player/hollowmere-nala",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-lin",
        "character-other/hollowmere-priya",
        "character-other/hollowmere-kit",
      ],
    },
    {
      fact: "Kendal holds a market on Saturdays: fruit, cheese, wool, secondhand books and a charms stall.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-penhallow",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-lin",
        "character-other/hollowmere-priya",
      ],
    },
    {
      fact: "Kendal has a cinema, a bookshop with a café upstairs, and a licensed charm-maker's shop.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-amara",
        "character-other/hollowmere-penhallow",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-lin",
        "character-other/hollowmere-priya",
      ],
    },
    {
      fact: "On Saturdays the Kendal buses are full of Hollowmere students, gowns left behind.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-shiv",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-lin",
        "character-other/hollowmere-priya",
      ],
    },
    {
      fact: "The last bus back from Kendal to Hollowmere village leaves at ten at night.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-lin",
        "character-other/hollowmere-priya",
        "character-other/hollowmere-kit",
      ],
    },
    {
      fact: "On Friday nights the Kendal cinema shows an old foreign film, subtitled, to a near-empty house.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-kit",
        "character-player/hollowmere-nala",
      ],
    },
    {
      fact: "Down an alley off Kendal's high street, Gianni's serves pasta by candles in bottles until nine.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-kit",
        "character-player/hollowmere-nala",
      ],
    },
    {
      fact: "Gianni, who runs Gianni's in Kendal, is small, loud and Italian, and calls Kit signorina.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-kit",
      ],
    },
  ],
} as const satisfies Place
