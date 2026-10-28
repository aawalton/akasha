import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const outcomeCardsCheck00001 = {
  id: "01a1801d-715a-7d7e-85a2-424f183c968b",
  type: "page-type/story-turn-played",
  slug: "outcome-cards-check-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/outcome-cards-check"],
  position: 1,
  prose: "txt",
  stepStatus: "step-status/beats",
  action: "I draw my sword and try to split a falling leaf in two before it touches the floor.",
  beats: "jsonl",
  lore: ["place/outcome-cards-check-world-square"],
  createdAt: "2026-10-28T01:26:15.641Z",
  updatedAt: "2026-10-28T01:33:23.991Z",
  ownLength: 69,
  outcomes: "jsonl",
  characters: ["character-player/outcome-cards-check-player"],
  endsAt: "2026-10-27T08:02:00.000Z",
} as const satisfies StoryTurnPlayed
