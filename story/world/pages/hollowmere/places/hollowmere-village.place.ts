import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const hollowmereVillage = {
  id: "01a0fd73-2c76-74b0-b744-c1bad77862f7",
  type: "page-type/place",
  slug: "hollowmere-village",
  title: "Hollowmere village",
  world: "world/hollowmere",
  facts: [
    {
      fact: "Hollowmere village is one slate-roofed street along the shore, a mile from the academy.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-bea",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-kit",
        "character-other/hollowmere-amara",
        "character-other/hollowmere-shiv",
        "character-other/hollowmere-penhallow",
      ],
    },
    {
      fact: "The village pub is the Drowned Bell, low-beamed, with a fire and a jukebox older than the students.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-shiv",
        "character-other/hollowmere-penhallow",
      ],
    },
    {
      fact: "The village shop sells bread, stamps, cheap charms, ink and paper, and closes at five sharp.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-shiv",
        "character-other/hollowmere-penhallow",
      ],
    },
    {
      fact: "A tearoom by the jetty does scones the size of fists, and is full of students every Wednesday.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-penhallow",
      ],
    },
    {
      fact: "A charity shop on the village street sells old gowns, jumpers and books for pennies.",
      knowers: ["lore-disclosure/game-master", "character-other/hollowmere-yusra"],
    },
    {
      fact: "A bus leaves the village for Kendal on the hour, and the last one back is at ten.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/hollowmere-yusra",
        "character-other/hollowmere-penhallow",
      ],
    },
  ],
} as const satisfies Place
