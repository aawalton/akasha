import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00081 = {
  id: "01a0ff2d-62cf-7294-9c73-8ac16d5d0eee",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-081",
  cover: "image/image-97787440c5ffb535",
  ownLength: 163,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 81,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-mother-sallow",
  ],
  stepStatus: "step-status/player",
  action: "I pocket the seed stone and follow the wolf, ready to hit it with my braid",
  beats: "jsonl",
  issues: ['"The banks there hold no sign." - Plain Negation'],
  lore: [
    "lore/overwhere-iii-corruption-2",
    "lore/overwhere-iii-mother-sallow",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
    "place/overwhere-iii-wrenwood",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-08T13:00:00.000Z",
  coverAfter: "Your sight shows you more. Around the old woman hangs an aura of sick violet-black.",
} as const satisfies StoryTurnPlayed
