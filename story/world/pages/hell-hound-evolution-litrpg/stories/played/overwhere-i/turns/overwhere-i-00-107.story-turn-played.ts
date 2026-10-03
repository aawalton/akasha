import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00107 = {
  id: "01a1016b-1171-7b77-935d-bcd612bb58f1",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-107",
  cover: "image/image-17770a6d911e628b",
  ownLength: 424,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 107,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action:
    "“Deal! How do I find the bile sac?” After getting instructions I go to the inn for a bath, a meal, and an early bed.",
  beats: "jsonl",
  issues: ['"You swing your feet out onto the cold boards." - Leave It Open'],
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "lore/overwhere-i-wendlow-2"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-06T06:00:00.000Z",
  coverAfter: 'Knuckles rap on the door. "Porridge and small beer downstairs, miss,"',
} as const satisfies StoryTurnPlayed
