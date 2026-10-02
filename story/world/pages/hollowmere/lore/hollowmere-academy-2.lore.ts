import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const hollowmereAcademy2 = {
  id: "01a0fe5f-845d-70c4-ab03-be3fc7e18208",
  type: "page-type/lore",
  slug: "hollowmere-academy-2",
  title: "Hollowmere Academy, continued",
  world: "world/hollowmere",
  about: "place/hollowmere-academy",
  facts: [
    {
      fact: "Debating meets at Thursday lunchtimes, and the swimmers at dawn every day but Sunday.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-amara",
        "character-other/hollowmere-shiv",
      ],
    },
    {
      fact: "The Snug is up a short stair in the old library: oak panels, an iron grate, sagging green sofas.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/hollowmere-nala",
        "character-other/hollowmere-kit",
      ],
    },
    {
      fact: "Life drawing meets Thursdays at seven in the Drawing Room, under lamps in place of the skylights.",
      knowers: ["lore-disclosure/game-master", "character-other/hollowmere-lin"],
    },
    {
      fact: "A student volunteers as life drawing's model each week, and sits clothed or nude as she chooses.",
      knowers: ["lore-disclosure/game-master", "character-other/hollowmere-lin"],
    },
    {
      fact: "History of Magic's second week covers the old trials of cunning-women, which ended in 1736.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-kit",
        "character-other/hollowmere-amara",
        "character-other/hollowmere-penhallow",
      ],
    },
  ],
} as const satisfies Lore
