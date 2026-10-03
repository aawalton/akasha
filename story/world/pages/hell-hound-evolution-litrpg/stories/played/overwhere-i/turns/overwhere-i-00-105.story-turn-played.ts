import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00105 = {
  id: "01a0ff75-cd53-72f7-9c82-8c5bd76be567",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-105",
  cover: "image/image-29fc3bea2cca4c40",
  ownLength: 167,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 105,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action: "“Eh, just the second pearl for now, range should cover what I need most.”",
  beats: "jsonl",
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "lore/overwhere-i-wendlow-2"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/memory",
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-05T13:15:00.000Z",
  coverAfter: "From a drawer she takes a small tin claim tag stamped with a number",
} as const satisfies StoryTurnPlayed
