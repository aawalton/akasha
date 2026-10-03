import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00116 = {
  id: "01a101ee-a8d4-7565-8250-1ef1c82b32c4",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-116",
  cover: "image/image-65ae5c1dd61892f5",
  ownLength: 429,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 116,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action:
    "Dinner and bed then back to the hunter’s guild to cash in my iou’s and check for new postings.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-wendlow-2",
    "lore/overwhere-i-wendlow-3",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T10:35:00.000Z",
  coverAfter: "From the canvas bag she draws a folded note, sealed with a blot",
} as const satisfies StoryTurnPlayed
