import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00045 = {
  id: "01a0e821-5526-7db4-81e3-279525dd6096",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-045",
  cover: "image/image-112719c2061231a4",
  coverAfter: "She digs a slightly bent card from her pack's side pocket and",
  ownLength: 139,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 45,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "I take one. \"Thank you. That's really cool. Are you open to new clients? I've been wanting to get in better shape, but I definitely need some personalization for the process.\"",
  beats: "jsonl",
  lore: ["lore/the-dating-game-aelwyn"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/picture", "story-recorder/memory"],
  endsAt: "2026-09-27T10:41:00.000Z",
} as const satisfies StoryTurnPlayed
