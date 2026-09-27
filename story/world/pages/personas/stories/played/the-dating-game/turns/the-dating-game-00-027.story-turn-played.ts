import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00027 = {
  id: "01a0e544-c4be-7253-9a31-01d94c7ed0f1",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-027",
  ownLength: 157,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 27,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  turnStatus: "turn-status/recorders",
  action:
    "“Usually just around the neighborhood. Sometime up the canyon, into the forest. I’ve watched the sun rise from the top of the mountain a few times.”",
  beats: [
    'Alan: "Usually just around the neighborhood. Sometimes up the canyon, into the forest."',
    '"I\'ve watched the sun rise from the top of the mountain a few times."',
    'At "the top of the mountain" Grace\'s smile deepens, slow.',
    '"Then you\'ve kept the whole night through, start to finish," she says. "Not many do."',
    "She looks up the street toward the dark mouth of the canyon, as if seeing him up there.",
    "The gold in the sky has gone to rose while they talked, and the first streetlight flickers on.",
    "Grace glances at it, then rises from the step in one easy motion.",
    "She lifts the brass storm lantern by its handle and strikes a match; the wick catches.",
    "The lantern's small light comes up steady and warm between them.",
    '"That\'s my hour starting," she says, the lantern swinging lightly from her hand.',
  ],
  issues: ['"her gold eyes rest on you a moment, unhurried" - No Prompt'],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture"],
} as const satisfies StoryTurnPlayed
