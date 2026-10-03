import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00032 = {
  id: "01a0e56e-65e9-718d-b709-e594b2990d4f",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-032",
  cover: "image/image-302c8518e100c28d",
  coverAfter: "She walks a few steps in silence, the lantern light sliding over",
  ownLength: 106,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 32,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "I chuckle softly. “Thanks, I’ll gladly take you up on that. So, what brings you here? It sounds like you do this often?”",
  beats: "jsonl",
  issues: "txt",
  lore: ["lore/the-dating-game-grace"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T19:33:00.000Z",
} as const satisfies StoryTurnPlayed
