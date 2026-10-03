import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00044 = {
  id: "01a0e81a-4a1e-7e53-99e7-3c211c8935e4",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-044",
  cover: "image/image-2d6a9aa1e9aad7d5",
  coverAfter: "She pulls a bag of snap peas from her pack, eats one",
  ownLength: 145,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 44,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: '"Hah, that\'s fine. So this is what you do? Workout videos in the mountains?"',
  beats: "jsonl",
  lore: ["lore/the-dating-game-aelwyn"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-27T10:39:00.000Z",
} as const satisfies StoryTurnPlayed
