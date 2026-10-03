import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00096 = {
  id: "01a0ff3c-360a-70a6-8746-af27032f5800",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-096",
  cover: "image/image-c42e8a6a3fe52cc4",
  ownLength: 210,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 96,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action: "Same strategy",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "lore/overwhere-ii-varrow-talented",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-22T07:15:00.000Z",
  coverAfter: "The spark runs back up the tide like fire up a fuse, into your palm.",
} as const satisfies StoryTurnPlayed
