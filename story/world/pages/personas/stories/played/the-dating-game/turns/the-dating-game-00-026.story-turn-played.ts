import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00026 = {
  id: "01a0e53f-8538-7ac0-a34a-c358f4eb6aa0",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-026",
  cover: "image/image-fc99bf13a3df5b54",
  coverAfter: "She turns the unlit lantern a quarter turn on the step, idly,",
  ownLength: 118,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 26,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action:
    "“I love walking in the night. My sleep is a little irregular, so sometimes I’ll be out at basically any hour, but the deep night is my favorite. Cool, quiet, calm. I find it soothing.”",
  beats: [
    'Alan: "I love walking in the night. My sleep is a little irregular,"',
    '"so sometimes I\'ll be out at basically any hour, but the deep night is my favorite."',
    '"Cool, quiet, calm. I find it soothing."',
    "Grace's gold eyes warm, and she tilts her head, really looking at him now.",
    '"Most people only put up with the dark," she says, low. "You like it."',
    '"Cool, quiet, calm," she repeats, slowly, as if tasting how well he put it.',
    "\"It's never frightened me either. It's where things get honest.\"",
    "She turns the unlit lantern a quarter turn on the step, idly, her eyes still on him.",
    '"So where do your feet take you, at that hour?"',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/picture", "story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-26T17:06:00.000Z",
} as const satisfies StoryTurnPlayed
