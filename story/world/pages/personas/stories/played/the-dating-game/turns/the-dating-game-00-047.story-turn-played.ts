import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00047 = {
  id: "01a0e82e-b09b-7661-a482-b794fdc08b54",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-047",
  cover: "image/image-78ca41a6ab166fb9",
  coverAfter: "She hops down onto the park grass to show you, stepping short",
  ownLength: 82,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 47,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: '"Great! How do I fix that?"',
  beats: "jsonl",
  lore: ["lore/the-dating-game-aelwyn"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-27T11:52:00.000Z",
} as const satisfies StoryTurnPlayed
