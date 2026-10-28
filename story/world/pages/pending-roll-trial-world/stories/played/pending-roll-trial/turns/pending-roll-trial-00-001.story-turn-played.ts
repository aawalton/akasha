import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const pendingRollTrial00001 = {
  id: "01a183d0-000d-7b98-a0a1-57b51d21bbf0",
  type: "page-type/story-turn-played",
  slug: "pending-roll-trial-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/pending-roll-trial"],
  position: 1,
  characters: ["character-player/pending-roll-trial-player"],
  stepStatus: "step-status/game-master",
  action: "I draw my sword and cut the rope holding the sign",
  createdAt: "2026-10-28T18:40:09.228Z",
  updatedAt: "2026-10-28T18:42:42.184Z",
  outcomes: "jsonl",
} as const satisfies StoryTurnPlayed
