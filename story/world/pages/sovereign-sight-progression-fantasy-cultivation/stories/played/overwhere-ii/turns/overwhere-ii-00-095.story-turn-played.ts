import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00095 = {
  id: "01a0ff2c-038b-71b8-be2b-59dc8595ee12",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-095",
  cover: "image/image-9f844c9f362f0aa7",
  ownLength: 224,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 95,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action:
    "This time I rush her, attacking in a flurry, using small pushes and pulls to move her or me just out of place to block",
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
  endsAt: "2026-10-22T07:10:00.000Z",
  coverAfter: "Your blunt point taps her square in the breastbone. A clean touch.",
} as const satisfies StoryTurnPlayed
