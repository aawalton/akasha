import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00020 = {
  id: "01a0f351-795c-726c-b54e-d680546a189e",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-020",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 20,
  stepStatus: "step-status/game-master",
  action:
    "I do as instructed, eating then paying to get the knee healed, then I go have a conversation with Ilsa and share the concern and see if she would adjust the report.",
  lore: [
    "lore/overwhere-iv-brookside-four",
    "lore/overwhere-iv-ilsa-crane",
    "place/overwhere-iv-millbrook-gatehouse",
  ],
} as const satisfies StoryTurnPlayed
