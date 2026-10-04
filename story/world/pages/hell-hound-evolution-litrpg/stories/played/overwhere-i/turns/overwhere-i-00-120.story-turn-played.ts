import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00120 = {
  id: "01a1070d-eccf-7a41-8dcf-f7d19a767c34",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-120",
  ownLength: 258,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 120,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“I don’t mind killing things when paid, but what else is in this oath? I value my freedom.”",
  beats: "jsonl",
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "lore/overwhere-i-odile-varne"],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics", "story-recorder/plan"],
  endsAt: "2026-10-07T12:30:00.000Z",
} as const satisfies StoryTurnPlayed
