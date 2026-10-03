import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00111 = {
  id: "01a101d9-e4f6-7d67-aa62-a4d3e60fb329",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-111",
  cover: "image/image-0824345dc8841bfa",
  ownLength: 240,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 111,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action:
    "“Don’t know for sure. Here. But that’s a mystery for another day.” I tell her about the pool.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-keeper-anselm-2",
    "lore/overwhere-ii-maud-ashby",
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-26T21:38:00.000Z",
  coverAfter: "Her face darkens. \"But the throat's out in the middle, in the black.",
} as const satisfies StoryTurnPlayed
