import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00020 = {
  id: "01a0e3a1-f6b6-7332-b7d6-8e14285f822b",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-020",
  cover: "image/image-0fd5069de34d5b3e",
  coverAfter: "You go back down the quiet hall toward the door, the carpet",
  ownLength: 121,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 20,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "I reach out to shake her hand with a huge smile \"It's a date! I'll see you Saturday!\", then turn to leave.",
  beats: "jsonl",
  issues: "txt",
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T12:04:00.000Z",
} as const satisfies StoryTurnPlayed
