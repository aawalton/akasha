import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00039 = {
  id: "01a0e59b-5001-754e-9cf5-132d763fb236",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-039",
  cover: "image/image-7314651607e1bc43",
  coverAfter: "Her hair is long and loose, auburn-chestnut, red only where the light",
  ownLength: 242,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 39,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: "“Good night, Grace.” I watch her go, then head home and go to sleep.",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-27T08:00:00.000Z",
} as const satisfies StoryTurnPlayed
