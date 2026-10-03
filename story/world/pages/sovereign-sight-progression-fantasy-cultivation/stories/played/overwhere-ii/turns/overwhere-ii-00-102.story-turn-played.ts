import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00102 = {
  id: "01a1016c-e30e-7273-b960-c36fb45dbdb9",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-102",
  cover: "image/image-794c2b23996b0c95",
  ownLength: 186,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 102,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action: "“Sleep now. Best to deal with the rest rested and with light.”",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-callow-beck",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-26T06:30:00.000Z",
  coverAfter: "Your throat is cracked dry. Your head pounds, and your tongue feels thick.",
} as const satisfies StoryTurnPlayed
