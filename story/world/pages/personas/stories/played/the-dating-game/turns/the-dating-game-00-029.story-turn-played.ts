import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00029 = {
  id: "01a0e555-a6cf-761e-840c-8baf90d77c61",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-029",
  cover: "image/image-52521dd12c274dbe",
  coverAfter: "Grace slows beside an old headstone, its carved name worn soft by",
  ownLength: 137,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 29,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "“No, I like the quiet here too. I have a hard time feeling like death is real though. The past, the present, and the future all blur together for me.”",
  beats: "jsonl",
  issues: [
    '"[Grace, Closeness Level 1: ...]" - her closeness level is hidden, never shown in a window',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/memory", "story-recorder/mechanics"],
  endsAt: "2026-09-26T19:27:00.000Z",
} as const satisfies StoryTurnPlayed
