import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00018 = {
  id: "01a0e38a-d500-7801-adc2-e493978d85b3",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-018",
  cover: "image/image-614ebb677ea1efb9",
  coverAfter: "In the booth she looks down at the open book, and for",
  ownLength: 277,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 18,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "I sit in the chair. \"Okay, you tell me what to do, I'm yours for as long as you want me. Otherwise, I'll gladly just listen.\"",
  beats: "jsonl",
  issues: [
    '"holds up one finger. Press it once." - No Prompt',
    '"She turns to the first page" - she already set it open and smoothed the first page flat',
  ],
  lore: ["lore/the-dating-game-alan"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T12:00:00.000Z",
} as const satisfies StoryTurnPlayed
