import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00008 = {
  id: "01a14bd3-1c39-7ea2-9785-d4d1a915473c",
  type: "page-type/story-turn-played",
  slug: "thornford-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 8,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/mechanics",
  action: '"Porridge is great. My goal is to make you look delicious anyways" I say with a wink',
  beats: "jsonl",
  lore: ["lore/thornford-shaestrel"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T21:44:48.953Z",
  updatedAt: "2026-10-17T21:45:43.034Z",
  ownLength: 130,
  endsAt: "2026-04-29T20:35:00.000Z",
} as const satisfies StoryTurnPlayed
