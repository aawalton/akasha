import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00040 = {
  id: "01a0e7fb-1d4a-75c1-920c-d9732b54ca83",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-040",
  cover: "image/image-44a1b339f847f808",
  coverAfter: "She is there. Long loose auburn-chestnut hair, freckles across her nose, vivid",
  ownLength: 244,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 40,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    'I get up for the day, dress is slacks and my "adventurer shirt" that I wear to ren faires, and then hike up Rock Canyon to the clearing I recognized from my dream.',
  beats: "jsonl",
  lore: ["lore/the-dating-game-aelwyn", "place/the-dating-game-rock-canyon"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-27T10:10:00.000Z",
} as const satisfies StoryTurnPlayed
