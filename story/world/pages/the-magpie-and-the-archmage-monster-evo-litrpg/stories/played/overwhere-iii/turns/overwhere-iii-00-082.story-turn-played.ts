import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00082 = {
  id: "01a0ff3d-5aec-77f2-8650-c9fea194496d",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-082",
  cover: "image/image-530b9cbb1c11aff5",
  ownLength: 246,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 82,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-mother-sallow",
  ],
  stepStatus: "step-status/player",
  action:
    "I hit her with the braid at full power, without warning. Then again and again until the notification hits.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iii-mother-sallow",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-08T13:02:00.000Z",
  coverAfter:
    "Her old face slides away. Beneath it she is forty, hard-jawed, with black-ringed eyes.",
} as const satisfies StoryTurnPlayed
