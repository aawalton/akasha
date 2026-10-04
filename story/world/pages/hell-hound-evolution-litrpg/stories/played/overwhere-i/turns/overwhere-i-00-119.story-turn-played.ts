import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00119 = {
  id: "01a106fc-ef36-75f0-bb32-1f7e236285bb",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-119",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 119,
  stepStatus: "step-status/mechanics",
  action:
    "“I was born in the wilds, no home, no lord, no papers. Would Wendlow be fine to claim? I’m tired of the questions.”",
  beats: "jsonl",
  lore: ["lore/overwhere-i-odile-varne"],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics"],
  endsAt: "2026-10-07T12:25:00.000Z",
} as const satisfies StoryTurnPlayed
