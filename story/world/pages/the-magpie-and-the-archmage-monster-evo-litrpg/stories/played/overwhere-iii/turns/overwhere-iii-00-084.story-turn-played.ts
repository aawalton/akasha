import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00084 = {
  id: "01a0ff5d-8f53-7f44-baca-8e53104f53ec",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-084",
  cover: "image/image-5a21b3aecbaa6508",
  ownLength: 293,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 84,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-edda-crane",
    "character-other/overwhere-iii-mother-sallow",
  ],
  stepStatus: "step-status/player",
  action:
    "“Corrupt wolves, I fought them off, but they hurt me bad, can you get me to the shrine? That’s my best chance to heal myself.”",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-current-feed",
    "lore/overwhere-iii-edda-crane",
    "lore/overwhere-iii-mending-weave",
    "lore/overwhere-iii-mother-sallow",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-08T16:35:00.000Z",
  coverAfter:
    "You sag against the stone. Your palms are raw again, but the cold is gone from your blood.",
} as const satisfies StoryTurnPlayed
