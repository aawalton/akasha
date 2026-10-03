import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00110 = {
  id: "01a101cf-cf5d-75aa-9898-6ea5a0aef90a",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-110",
  cover: "image/image-09365d0d7f4cefaf",
  ownLength: 195,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 110,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action: "“Yes.” I hold out my hand.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-maud-ashby",
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-26T21:08:00.000Z",
  coverAfter: "She studies your face with sharp blue eyes, the laughter gone out of them.",
} as const satisfies StoryTurnPlayed
