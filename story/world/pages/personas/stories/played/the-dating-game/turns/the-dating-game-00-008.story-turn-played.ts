import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00008 = {
  id: "01a0e329-ffe5-7fe4-b6fd-bfe327e4adbc",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-008",
  cover: "image/image-98c25b39c7486ce1",
  coverAfter: "She taps her own chest, just below the headphones, and a crooked",
  ownLength: 244,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 8,
  prose: "txt",
  characters: ["character-other/the-dating-game-echo", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    'I stop dead in my tracks and look at her in shock. "Wait a minute, you\'re not just named "Echo", you are THE Echo, cursed by Hera! That\'s amazing! I always thought there was more to the stories than just stories." I grin at her, bouncing on my toes in excitement. "That means you must be at least two thousand years old! No wonder I feel so comfortable with you. I have total aphantasia, which means I have no experiential memory at all, which makes me experience the world as if I\'m ageless. I\'ve been like that since I was a kid, which made me a really weird kid, always much too old for my age."',
  beats: "jsonl",
  issues: "txt",
  lore: ["lore/the-dating-game-alan"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory"],
  endsAt: "2026-09-26T09:46:00.000Z",
} as const satisfies StoryTurnPlayed
