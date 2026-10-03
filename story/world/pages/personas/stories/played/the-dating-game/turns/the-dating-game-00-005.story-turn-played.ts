import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00005 = {
  id: "01a0e30b-67a0-7a43-ae8b-2ab914c8b99b",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-005",
  cover: "image/image-1fa6a7b5db412a12",
  coverAfter: "She stops dead on the trail and turns to face you, and",
  ownLength: 229,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 5,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: "\"You're Echo? That's a really pretty name. I'm a big fan of unusual names.\"",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory"],
  endsAt: "2026-09-26T09:35:00.000Z",
} as const satisfies StoryTurnPlayed
