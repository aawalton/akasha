import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const outcomeCardsCheck00001 = {
  id: "01a1801d-715a-7d7e-85a2-424f183c968b",
  type: "page-type/story-turn-played",
  slug: "outcome-cards-check-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/outcome-cards-check"],
  position: 1,
  stepStatus: "step-status/game-master",
  action: "I draw my sword and try to split a falling leaf in two before it touches the floor.",
  lore: ["place/outcome-cards-check-world-square"],
  createdAt: "2026-10-28T01:26:15.641Z",
  updatedAt: "2026-10-28T01:27:37.900Z",
} as const satisfies StoryTurnPlayed
