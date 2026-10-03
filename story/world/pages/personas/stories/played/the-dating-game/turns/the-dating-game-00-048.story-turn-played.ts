import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00048 = {
  id: "01a0e837-3293-7d7b-ad6c-134bbcd04ea5",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-048",
  cover: "image/image-25566025b1e61610",
  coverAfter: "She throws both hands up in a V, loud enough that a",
  ownLength: 128,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 48,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: "I try to follow her instructions, sneaking towards her.",
  beats: "jsonl",
  lore: ["lore/the-dating-game-aelwyn"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-27T11:54:00.000Z",
} as const satisfies StoryTurnPlayed
