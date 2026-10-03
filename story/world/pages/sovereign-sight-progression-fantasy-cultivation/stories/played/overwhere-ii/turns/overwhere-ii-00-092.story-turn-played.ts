import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00092 = {
  id: "01a0fefc-f0b0-7e09-8c4f-ab0f7435d599",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-092",
  cover: "image/image-fe245a1498ca7716",
  ownLength: 280,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 92,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action: "“I’ll train with them in the mornings, refine after, until my refining is done.”",
  beats: "jsonl",
  issues: "txt",
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
  endsAt: "2026-10-22T06:48:00.000Z",
  coverAfter: "Osric sets his feet across the frosted court, maul raised.",
} as const satisfies StoryTurnPlayed
