import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00052 = {
  id: "01a0e853-1e55-74a6-b08e-4464b8d65e1b",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-052",
  cover: "image/image-d0eac0eed6fadd58",
  coverAfter: "She tips up the book so you can see it: an old",
  ownLength: 124,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 52,
  prose: "txt",
  characters: ["character-other/the-dating-game-talia", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: "\"Hi there, I'm Alan, what's your name?\"",
  beats: "jsonl",
  lore: ["lore/the-dating-game-talia"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-27T13:42:00.000Z",
} as const satisfies StoryTurnPlayed
