import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00017 = {
  id: "01a0e37d-131a-7185-bbc4-4faee6d3bc92",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-017",
  cover: "image/image-d4aded86f5be09fb",
  coverAfter: "She leads you down a quiet hall, carpet hushing your steps, past",
  ownLength: 367,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 17,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "\"Oh, you want to do the recording at BYU Radio? I guess that works. Want to head there now? I'd have to stop in at my house to pick up the first volume, but its on the way, you'd be welcome to wait outside.\"",
  beats: "jsonl",
  lore: ["place/the-dating-game-byu-broadcasting", "lore/the-dating-game-alan"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T11:45:00.000Z",
} as const satisfies StoryTurnPlayed
