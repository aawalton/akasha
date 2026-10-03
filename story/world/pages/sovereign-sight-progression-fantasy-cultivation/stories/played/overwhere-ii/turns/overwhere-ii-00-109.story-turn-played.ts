import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00109 = {
  id: "01a101c4-d807-7009-85c3-9946634e7374",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-109",
  cover: "image/image-f9f7912ce89643dd",
  ownLength: 191,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 109,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action:
    "“Okay, I cleansed a few paces, but you can’t tell, it’s filling just as fast. Lets go see if this keeper gas any ideas.”",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-maud-ashby",
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-whitecombs-2",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-26T20:58:00.000Z",
  coverAfter: "She holds out a square, callused hand, palm up.",
} as const satisfies StoryTurnPlayed
