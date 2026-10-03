import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00094 = {
  id: "01a101c6-f616-71dd-9fb4-17410eecc59c",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-094",
  cover: "image/image-52eee761286453bb",
  ownLength: 141,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 94,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala"],
  stepStatus: "step-status/player",
  action:
    "I rest and recover my mana, while practicing with the currents, trying to come up with new spells",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iii-holy-ward",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-09T17:15:00.000Z",
  coverAfter: "A faint white-gold shimmer lies over your skin, and holds.",
} as const satisfies StoryTurnPlayed
