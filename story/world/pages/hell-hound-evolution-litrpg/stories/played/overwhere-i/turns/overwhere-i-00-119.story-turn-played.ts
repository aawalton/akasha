import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00119 = {
  id: "01a106fc-ef36-75f0-bb32-1f7e236285bb",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-119",
  cover: "image/image-662ba60d31947c60",
  ownLength: 211,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 119,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/writer",
  action:
    "“I was born in the wilds, no home, no lord, no papers. Would Wendlow be fine to claim? I’m tired of the questions.”",
  beats: "jsonl",
  issues: "txt",
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "lore/overwhere-i-odile-varne"],
  reviewedBy: ["story-reviewer/scene", "story-reviewer/holdings", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/plan",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T12:25:00.000Z",
  coverAfter: "Below the bench, the clerk rises. He lifts a heavy book with iron-shod",
} as const satisfies StoryTurnPlayed
