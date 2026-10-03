import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00093 = {
  id: "01a0ff09-9736-7029-b1ee-efa78250d393",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-093",
  cover: "image/image-c6d762e96dcf7d29",
  ownLength: 204,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 93,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action: "I choose a spear, since that’s what I’m used to",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "lore/overwhere-ii-varrow-talented",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-22T07:00:00.000Z",
  coverAfter: "Your blunt point drives hard into his ribs: a clean touch.",
} as const satisfies StoryTurnPlayed
