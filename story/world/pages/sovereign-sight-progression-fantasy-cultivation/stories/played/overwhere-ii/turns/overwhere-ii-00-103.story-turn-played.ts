import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00103 = {
  id: "01a10178-e37f-75ee-8af5-caefff0e50e3",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-103",
  cover: "image/image-7a8ca1bd86184b99",
  ownLength: 193,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 103,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action: "“Food and water, then up to the pool”",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-whitecombs",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-26T10:00:00.000Z",
  coverAfter: "Through your heels you feel the crag's deep tug swell with the water,",
} as const satisfies StoryTurnPlayed
