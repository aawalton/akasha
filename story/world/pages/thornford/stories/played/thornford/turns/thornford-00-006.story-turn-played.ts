import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00006 = {
  id: "01a14bcb-07a5-7118-9514-c81f7b730e51",
  type: "page-type/story-turn-played",
  slug: "thornford-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 6,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/recorders",
  action: '"All right, I\'ll see you tomorrow Shaestrel." After she leaves, I get to work.',
  beats: "jsonl",
  lore: [
    "lore/thornford-fae-bargains-and-glamour",
    "lore/thornford-morag-bain",
    "lore/thornford-shaestrel",
    "place/thornford-nalas-shop",
  ],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics", "story-recorder/plan"],
  roleplayed: true,
  createdAt: "2026-10-17T21:35:59.396Z",
  updatedAt: "2026-10-17T21:37:53.280Z",
  ownLength: 179,
  endsAt: "2026-04-28T22:45:00.000Z",
} as const satisfies StoryTurnPlayed
