import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00100 = {
  id: "01a0ff76-dc11-76bb-aa76-1a58d2192e01",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-100",
  cover: "image/image-7264fa7aaa580626",
  ownLength: 230,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 100,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action: "I test my strength, Pushing against the blackness",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-callow-beck",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-25T16:50:00.000Z",
  coverAfter: "At once the black water at the gully mouth leans down again.",
} as const satisfies StoryTurnPlayed
