import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00104 = {
  id: "01a0ff66-7daf-7917-9526-e4aa566a4e0d",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-104",
  cover: "image/image-f6c5bcfcc7eac086",
  ownLength: 311,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 104,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action:
    "“Lets do the ring, I like to keep my hands free. Anything we can do it make it stronger? I have gold to spare, say up to 50 gold investment? What options do you have for me?”",
  beats: "jsonl",
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "lore/overwhere-i-wendlow-2"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-05T13:10:00.000Z",
  coverAfter: "She taps the counter between the two trays.",
} as const satisfies StoryTurnPlayed
