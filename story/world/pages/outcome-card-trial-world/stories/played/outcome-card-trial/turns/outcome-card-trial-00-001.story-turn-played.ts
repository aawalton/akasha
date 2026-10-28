import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const outcomeCardTrial00001 = {
  id: "01a183af-9de8-7dad-9c77-477736ca03ff",
  type: "page-type/story-turn-played",
  slug: "outcome-card-trial-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/outcome-card-trial"],
  position: 1,
  prose: "txt",
  characters: ["character-player/outcome-card-trial-player"],
  stepStatus: "step-status/player",
  action: "I draw my sword and cut the rope holding the sign",
  createdAt: "2026-10-28T18:04:46.950Z",
  updatedAt: "2026-10-28T18:05:05.083Z",
  outcomes: "jsonl",
} as const satisfies StoryTurnPlayed
