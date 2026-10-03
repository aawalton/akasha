import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00046 = {
  id: "01a0e828-d5f3-740f-a947-4c0188cfcf9e",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-046",
  cover: "image/image-afedbf58a83c4c00",
  coverAfter: "A little before noon you come out at the trailhead, the park's",
  ownLength: 179,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 46,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "\"Sounds great! I'm excited, I think you'll be really good for me. I hope I can be a good fit for you too.\"",
  beats: "jsonl",
  lore: ["lore/the-dating-game-aelwyn"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-27T11:50:00.000Z",
} as const satisfies StoryTurnPlayed
