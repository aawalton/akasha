import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00003 = {
  id: "01a14b91-3532-7239-83f1-cab3aa09590b",
  type: "page-type/story-turn-played",
  slug: "thornford-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 3,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/mechanics",
  action: '"Deal"',
  beats: "jsonl",
  lore: ["lore/thornford-fae-bargains-and-glamour"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics"],
  roleplayed: true,
  createdAt: "2026-10-17T20:32:49.969Z",
  updatedAt: "2026-10-17T20:35:01.564Z",
  ownLength: 107,
  endsAt: "2026-04-28T18:09:00.000Z",
} as const satisfies StoryTurnPlayed
