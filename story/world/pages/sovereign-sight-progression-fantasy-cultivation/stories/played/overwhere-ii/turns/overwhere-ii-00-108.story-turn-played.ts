import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00108 = {
  id: "01a101b7-5be6-7639-b9e0-02432f920f60",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-108",
  cover: "image/image-a94a9e52ab27a6bd",
  ownLength: 297,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 108,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action:
    "“Go down to the village, there should be more chambers from the wolves I killed there, bring back any you can find. I’ll focus on clearing the water, and we’ll see if it helps.” Then I focus on the pool",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-greymaws",
    "lore/overwhere-ii-keeper-anselm-2",
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-whitecombs-2",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-26T17:38:00.000Z",
  coverAfter: "The sun sits low on the Whitecombs. The pool swells, and eases, and swells.",
} as const satisfies StoryTurnPlayed
