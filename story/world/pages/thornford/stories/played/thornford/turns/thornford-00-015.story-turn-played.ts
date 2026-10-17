import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00015 = {
  id: "01a14be6-08e2-763b-98df-d89c65355520",
  type: "page-type/story-turn-played",
  slug: "thornford-00-015",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 15,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/mechanics",
  action: '"Just in time for the final fitting. Let me know if you need any final alterations."',
  beats: "jsonl",
  lore: ["lore/thornford-fae-bargains-and-glamour", "lore/thornford-shaestrel"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics"],
  roleplayed: true,
  createdAt: "2026-10-17T22:05:29.186Z",
  updatedAt: "2026-10-17T22:07:16.568Z",
  ownLength: 201,
  endsAt: "2026-04-30T21:18:00.000Z",
} as const satisfies StoryTurnPlayed
