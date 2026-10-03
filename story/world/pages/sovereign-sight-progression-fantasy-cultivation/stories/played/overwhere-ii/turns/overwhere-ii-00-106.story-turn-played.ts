import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00106 = {
  id: "01a10199-34b9-7cde-af09-f39c06bf9148",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-106",
  cover: "image/image-6d4fa5e33a22cac9",
  ownLength: 132,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 106,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action:
    "I empty out my leather pouch into another bag and pull the bead into the pouch, to see if it will hold it.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-whitecombs",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-26T11:23:00.000Z",
  coverAfter:
    "The bead drops from the pouch onto the stone, and begins to crawl toward the pool again.",
} as const satisfies StoryTurnPlayed
