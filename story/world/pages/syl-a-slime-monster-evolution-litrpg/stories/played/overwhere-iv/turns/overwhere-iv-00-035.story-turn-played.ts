import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00035 = {
  id: "01a0f416-ee47-7ce8-a842-eaebbccb02b6",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-035",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 35,
  stepStatus: "step-status/game-master",
  action: "I work with the rest to gather the ears and go with them back to the hall.",
  lore: [
    "lore/overwhere-iv-ilsa-crane",
    "place/overwhere-iv-millbrook-adventurers-hall",
    "place/overwhere-iv-the-tangle",
  ],
} as const satisfies StoryTurnPlayed
