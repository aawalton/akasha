import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00021 = {
  id: "01a0e3c2-ce6b-745b-ba86-7e31f6a3edd8",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-021",
  cover: "image/image-b00b994144f16746",
  coverAfter: "The stream circles the whole campus, and the trail keeps to its",
  ownLength: 155,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 21,
  prose: "txt",
  characters: ["character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "While I’m on campus, I decide to take a leisurely walk on the quiet trail next to the stream circling campus, halfway down the hill",
  beats: "jsonl",
  issues: "txt",
  lore: ["place/the-dating-game-byu-stream-trail"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-26T12:25:00.000Z",
} as const satisfies StoryTurnPlayed
