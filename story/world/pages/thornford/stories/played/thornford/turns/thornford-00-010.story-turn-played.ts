import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00010 = {
  id: "01a14bd6-c578-77a0-a108-c9a808a25405",
  type: "page-type/story-turn-played",
  slug: "thornford-00-010",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 10,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/recorders",
  action: '"Can\'t be too sure its fitting right. I could check it all again, more thoroughly..."',
  beats: "jsonl",
  lore: ["lore/thornford-fae-bargains-and-glamour", "lore/thornford-shaestrel"],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics", "story-recorder/plan"],
  roleplayed: true,
  createdAt: "2026-10-17T21:48:48.887Z",
  updatedAt: "2026-10-17T21:50:39.371Z",
  ownLength: 87,
  endsAt: "2026-04-29T20:58:00.000Z",
} as const satisfies StoryTurnPlayed
