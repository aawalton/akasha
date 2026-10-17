import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const thornford00007 = {
  id: "01a14bbc-8f7b-7e3d-9710-01e21e8df1b8",
  type: "page-type/story-turn-played",
  slug: "thornford-00-007",
  cover: "image/image-e012914caf9bd7ef",
  unit: "unit/words",
  partOfCollections: ["story-played/thornford"],
  position: 7,
  prose: "txt",
  characters: ["character-player/thornford-nala"],
  stepStatus: "step-status/player",
  action:
    '"Okay, fae rules." I think to myself. "What better needle for fae silk than the stem of a leaf?" I find an appropriate stem from the leaves Shaestrel left behind and use that as my needle.',
  beats: "jsonl",
  lore: ["lore/thornford-grey-green-silk"],
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
  coverAfter: "When you dab it with your thumb, it spreads. A green smear",
  createdAt: "2026-10-17T21:20:11.131Z",
  updatedAt: "2026-10-17T21:23:48.953Z",
  ownLength: 205,
  endsAt: "2026-04-28T22:55:00.000Z",
} as const satisfies StoryTurnPlayed
