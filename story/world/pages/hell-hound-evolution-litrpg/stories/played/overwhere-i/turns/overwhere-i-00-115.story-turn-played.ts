import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00115 = {
  id: "01a101da-fa5d-783b-8116-b529d8836500",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-115",
  cover: "image/image-1ea5b5271f221ac2",
  ownLength: 337,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 115,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action:
    "I spend the afternoon testing weaves to see if I can get something to repair the tears in my clothes.",
  beats: "jsonl",
  issues: [
    '"edges frayed and stiff with old blood" - she steam-cleaned her clothes earlier on day 8',
    '"The sun has slid low and gold across Wendlow\'s roofs while you worked." - Leave It Open',
    '"Your throat is dry as dust, and from the square, supper smoke drifts up" - No Prompt',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-starfall-legacy-3",
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
  endsAt: "2026-10-06T17:57:00.000Z",
  coverAfter: "Your throat has gone dry as dust over the long afternoon. You pull",
} as const satisfies StoryTurnPlayed
