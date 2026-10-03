import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00094 = {
  id: "01a0ff16-5f34-73c0-80cd-45529d8fae49",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-094",
  cover: "image/image-f157f46124793abc",
  ownLength: 160,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 94,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action:
    "I fight defensively, like I did against Dray, waiting for the right moment to use my Talent in a surprising way to force an opening.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "lore/overwhere-ii-varrow-talented",
    "place/overwhere-ii-varrow-keep",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-22T07:05:00.000Z",
  coverAfter: "It drives into your ribs, on the bruise Osric left. A clean touch.",
} as const satisfies StoryTurnPlayed
