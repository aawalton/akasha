import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00107 = {
  id: "01a101a7-2d8e-745c-be80-40928618b8ca",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-107",
  cover: "image/image-8e46436410a5f4b8",
  ownLength: 157,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 107,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action: "I pull out one of the intact Greymaw chambers and see if that will hold it",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/overwhere-ii-greymaws",
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-26T11:28:00.000Z",
  coverAfter: "The chamber could hold far more.",
} as const satisfies StoryTurnPlayed
