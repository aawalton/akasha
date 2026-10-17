import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00004 = {
  id: "01a14b93-181d-7f55-9c77-bf661db4b47b",
  type: "page-type/story-turn-played",
  slug: "thornford-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 4,
  prose: "txt",
  characters: ["character-player/thornford-nala", "character-other/thornford-shaestrel"],
  stepStatus: "step-status/recorders",
  action:
    '"Of course, but this is silk, I would never make a dress from this that was less than my best work. I\'ll need you to strip so I can take accurate measurements. This gown must fit you perfectly."',
  beats: "jsonl",
  lore: [
    "lore/thornford-fae-bargains-and-glamour",
    "lore/thornford-grey-green-silk",
    "lore/thornford-shaestrel",
    "lore/thornford-tam-rennie",
    "place/thornford-town",
  ],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/plan",
    "story-recorder/memory",
  ],
  roleplayed: true,
  createdAt: "2026-10-17T20:34:53.596Z",
  updatedAt: "2026-10-17T20:38:34.038Z",
  ownLength: 274,
  endsAt: "2026-04-28T18:26:00.000Z",
} as const satisfies StoryTurnPlayed
