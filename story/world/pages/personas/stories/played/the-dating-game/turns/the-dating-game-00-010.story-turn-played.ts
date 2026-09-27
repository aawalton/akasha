import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00010 = {
  id: "01a0e33e-32e3-7872-9e25-e61f21f24b8a",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-010",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 10,
  turnStatus: "turn-status/world-builder",
  action:
    '"Oh, I love Tolkein. Have you read CS Lewis? I don\'t like his fiction quite as much, but I\'ve found his non-fiction deeply inspiring. I love the story of how The Lord of the Rings got written on a bet between the two of them. Modern fantasy really started in that Inklings club."\n\n"These days I mostly read LitRPG, are you familiar with that at all?"',
} as const satisfies StoryTurnPlayed
