import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00061 = {
  id: "01a0fdc2-7560-7d4e-977d-e46cec924dc6",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-061",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 61,
  stepStatus: "step-status/game-master",
  action:
    "I keep trying. Rift Rend and Spatial Sense must be related, both coming from my Dimensional Magic. I should be able to hit things I can’t see with my eyes. I can see the wolf clearly with my Spatial Sense, I should be able to target it there.",
  lore: [
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "place/overwhere-iv-crake-gill",
  ],
} as const satisfies StoryTurnPlayed
