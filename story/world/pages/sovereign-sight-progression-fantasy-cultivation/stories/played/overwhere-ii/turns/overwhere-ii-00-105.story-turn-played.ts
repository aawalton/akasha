import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00105 = {
  id: "01a1018c-f2e8-70fc-9abe-6bbea4fc41d6",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-105",
  cover: "image/image-ce6964d079a244b8",
  ownLength: 177,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 105,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action:
    "“Keep watch while I try some experiments.” I take a small amount of the black water from the runoff as my target and try to separate the blackness from the water, pushing one and pulling the other.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-whitecombs",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-26T11:20:00.000Z",
  coverAfter: "The bead stirs. Slowly, it begins to crawl across the stone, toward the pool.",
} as const satisfies StoryTurnPlayed
