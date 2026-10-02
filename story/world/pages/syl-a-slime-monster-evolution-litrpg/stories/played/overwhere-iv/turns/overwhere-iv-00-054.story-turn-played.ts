import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00054 = {
  id: "01a0fd6b-3e29-7730-bef6-52fbb7d1d204",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-054",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 54,
  stepStatus: "step-status/game-master",
  action:
    "I slice it as well, the go through and collect the ears, checking for any other loot as well, then guide the sheep back and report back to the guild.",
  lore: [
    "lore/overwhere-iv-ilsa-crane-2",
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "place/overwhere-iv-raiders-stream",
    "place/overwhere-iv-tull-farm",
  ],
} as const satisfies StoryTurnPlayed
