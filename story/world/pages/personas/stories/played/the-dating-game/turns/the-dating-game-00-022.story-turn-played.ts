import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00022 = {
  id: "01a0e3cf-51e6-7166-86fe-b3b3cbc26510",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-022",
  cover: "image/image-bd107933622d87ef",
  ownLength: 119,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 22,
  prose: "txt",
  characters: ["character-player/the-dating-game-alan"],
  turnStatus: "turn-status/player",
  action: "I continue around the hill, singing quietly to myself as I walk.",
  beats: [
    "Alan walks on around the hill, singing quietly to himself.",
    "The stream keeps time beside him, low over its stones.",
    "There is no one near to hear; the trail stays nearly empty in the Saturday afternoon.",
    "A breeze stirs the willows, and a few early red maple leaves come down onto the water.",
    "They ride the current along beside him for a while, then slip ahead around the bend.",
    "The trail curves with the hill, the campus buildings glimpsed now and then up through the trees.",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/memory", "story-recorder/mechanics"],
  endsAt: "2026-09-26T12:35:00.000Z",
} as const satisfies StoryTurnPlayed
