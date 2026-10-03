import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00025 = {
  id: "01a0e3e7-c589-7dab-b776-6cae83055c69",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-025",
  cover: "image/image-6240c2143e5e95f1",
  coverAfter: "She glances up at the sky over the rooftops, where the gold",
  ownLength: 159,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 25,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "“Hi there!” I walk over toward her. “I don’t think I’ve seen you here before. I’m Alan, I live just down the street there on Apple” I gesture back the way I came. “Nice to meet you!”",
  beats: "jsonl",
  issues: ['"and the move leaves room on the step beside her" - No Prompt'],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T17:05:00.000Z",
} as const satisfies StoryTurnPlayed
