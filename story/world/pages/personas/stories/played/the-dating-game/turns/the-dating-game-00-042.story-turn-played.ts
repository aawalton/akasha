import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00042 = {
  id: "01a0e80d-92b9-7594-a0fc-7015420de3f5",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-042",
  cover: "image/image-45ce25f650db09fb",
  coverAfter: "The two of you head on up the trail together, her pace",
  ownLength: 153,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 42,
  prose: "txt",
  characters: ["character-other/the-dating-game-aelwyn", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: '"Mind if I join you Aelwyn? Trail\'s always better with company."',
  beats: "jsonl",
  lore: ["place/the-dating-game-rock-canyon"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-27T10:27:00.000Z",
} as const satisfies StoryTurnPlayed
