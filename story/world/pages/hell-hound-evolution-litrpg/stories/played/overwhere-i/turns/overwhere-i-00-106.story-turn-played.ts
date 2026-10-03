import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00106 = {
  id: "01a0ff7f-4529-7530-841d-f4f91253eabb",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-106",
  cover: "image/image-e98aedf2f0c2f720",
  ownLength: 406,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 106,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action:
    "“Great! I’ll be back.” Then I go to the other two stores to sell the sword, crossbow, and grubboar tusks.",
  beats: "jsonl",
  issues: "txt",
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "lore/overwhere-i-wendlow-2"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
    "story-recorder/inventory",
  ],
  endsAt: "2026-10-05T13:45:00.000Z",
  coverAfter: "Mother Sallow is stooped and old, wrapped in shawls, a clay pipe clamped",
} as const satisfies StoryTurnPlayed
