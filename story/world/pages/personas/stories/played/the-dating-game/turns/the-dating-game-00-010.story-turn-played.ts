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
  beats: [
    'Alan: "Oh, I love Tolkien. Have you read CS Lewis?"',
    "\"I don't like his fiction quite as much, but I've found his non-fiction deeply inspiring.\"",
    '"I love the story of how The Lord of the Rings got written on a bet between the two of them."',
    '"Modern fantasy really started in that Inklings club."',
    '"These days I mostly read LitRPG, are you familiar with that at all?"',
    'At "Lewis" Echo nods fast, and at "non-fiction" she stops on the trail and turns to him.',
    "Her narrator's voice comes back, low and warm, giving him a line of Lewis's:",
    '"What! You too? I thought I was the only one."',
    "She holds his eyes as she says it, and plainly means it for the two of them.",
    'Then at "LitRPG" she grins wide and nods: she knows it well.',
    "She taps his chest once with a fingertip, and her grin turns sly.",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T09:50:00.000Z",
} as const satisfies StoryTurnPlayed
