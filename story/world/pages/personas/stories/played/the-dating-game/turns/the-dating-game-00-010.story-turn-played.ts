import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00010 = {
  id: "01a0e33e-32e3-7872-9e25-e61f21f24b8a",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-010",
  cover: "image/image-d4dc859b2444f522",
  coverAfter: 'At "Lewis" she nodded fast, three quick nods, her hair bouncing. At',
  ownLength: 218,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 10,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    '"Oh, I love Tolkein. Have you read CS Lewis? I don\'t like his fiction quite as much, but I\'ve found his non-fiction deeply inspiring. I love the story of how The Lord of the Rings got written on a bet between the two of them. Modern fantasy really started in that Inklings club."\n\n"These days I mostly read LitRPG, are you familiar with that at all?"',
  beats: "jsonl",
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T09:50:00.000Z",
} as const satisfies StoryTurnPlayed
