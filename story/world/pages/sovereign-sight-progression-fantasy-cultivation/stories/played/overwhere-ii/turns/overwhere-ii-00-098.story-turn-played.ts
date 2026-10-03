import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00098 = {
  id: "01a0ff58-0855-70e4-800f-d3bd395a03bb",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-098",
  cover: "image/image-a31d7bb6c6f6d614",
  ownLength: 223,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 98,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action: "“Yes. I’m ready now.”",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-lady-imre-varrow",
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "lore/overwhere-ii-varrow-talented",
    "place/overwhere-ii-callow-beck",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-25T14:30:00.000Z",
  coverAfter: "It paws the ground, and the other five lift their heads too.",
} as const satisfies StoryTurnPlayed
