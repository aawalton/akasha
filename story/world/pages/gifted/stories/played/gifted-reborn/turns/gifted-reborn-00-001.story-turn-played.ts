import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedReborn00001 = {
  id: "01a17ee3-f6af-780c-a4c3-566ea142685a",
  type: "page-type/story-turn-played",
  slug: "gifted-reborn-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-reborn"],
  position: 1,
  prose: "txt",
  characters: [
    "character-player/gifted-reborn-nala",
    "world-character/gifted-penelope-hawthorn",
    "world-character/gifted-cornelius-hawthorn",
    "world-character/gifted-halkur",
    "world-character/gifted-melody",
  ],
  stepStatus: "step-status/player",
  beats: "jsonl",
  lore: [
    "lore/gifted-reborn-nala",
    "place/gifted-outpost-common-room",
    "lore/gifted-cornelius-hawthorn",
    "lore/gifted-penelope-hawthorn",
  ],
  endsAt: "2026-10-27T20:45:00.000Z",
  createdAt: "2026-10-27T19:43:51.470Z",
  updatedAt: "2026-10-27T19:43:51.470Z",
} as const satisfies StoryTurnPlayed
