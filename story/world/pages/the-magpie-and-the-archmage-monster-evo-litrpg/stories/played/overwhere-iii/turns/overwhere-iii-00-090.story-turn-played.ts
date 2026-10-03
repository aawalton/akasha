import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00090 = {
  id: "01a10191-815c-72ec-8d13-a0fab76fda92",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-090",
  cover: "image/image-1a9f34b39a2f4c73",
  ownLength: 150,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 90,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala"],
  stepStatus: "step-status/player",
  action:
    "I run backwards to avoid being pincered and to bunch them up, then turn and hit them with a braided cleanse and lash across the three",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iii-braid-weaving",
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption-2",
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
  endsAt: "2026-10-09T11:43:00.000Z",
  coverAfter:
    "You turn and braid cleanse and lash together, then sweep the braid across all three.",
} as const satisfies StoryTurnPlayed
