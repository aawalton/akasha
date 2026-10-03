import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00027 = {
  id: "01a0e544-c4be-7253-9a31-01d94c7ed0f1",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-027",
  cover: "image/image-d4e45eea968e9af3",
  coverAfter: "She lifts the brass storm lantern by its handle, strikes a match,",
  ownLength: 157,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 27,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "“Usually just around the neighborhood. Sometime up the canyon, into the forest. I’ve watched the sun rise from the top of the mountain a few times.”",
  beats: "jsonl",
  issues: ['"her gold eyes rest on you a moment, unhurried" - No Prompt'],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T19:15:00.000Z",
} as const satisfies StoryTurnPlayed
