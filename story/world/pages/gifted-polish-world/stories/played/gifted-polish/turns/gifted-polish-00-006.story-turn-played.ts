import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedPolish00006 = {
  id: "01a18e17-af23-7a38-a5a6-40812655c3bd",
  type: "page-type/story-turn-played",
  slug: "gifted-polish-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-polish"],
  position: 6,
  prose: "txt",
  stepStatus: "step-status/beats",
  action: "I lie still and listen to the voices beyond the walls, trying to catch any whole word.",
  beats: "jsonl",
  lore: [
    "lore/gifted-polish-nala",
    "lore/gifted-polish-world-realms",
    "place/gifted-polish-world-womb",
  ],
  createdAt: "2026-10-30T18:34:39.267Z",
  updatedAt: "2026-10-30T18:47:12.697Z",
  ownLength: 280,
  outcomes: "jsonl",
  characters: ["character-player/gifted-polish-nala"],
  endsAt: "2026-10-28T09:20:00.000Z",
} as const satisfies StoryTurnPlayed
