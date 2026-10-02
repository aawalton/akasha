import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00038 = {
  id: "01a0e595-41ae-73c5-8732-c19e5aa98e86",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-038",
  cover: "image/image-d944162d17ee3c25",
  ownLength: 64,
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 38,
  prose: "txt",
  characters: ["character-other/the-dating-game-grace", "character-player/the-dating-game-alan"],
  stepStatus: "step-status/player",
  action: "“Mind if I join you again another night?”",
  beats: [
    'Alan: "Mind if I join you again another night?"',
    "Grace's smile comes slow and warm, all the way up into her gold eyes.",
    '"I\'d like that," she says. "Most evenings, about this hour. You know which step is mine."',
    "She lifts the lantern a little in farewell, its light warm across them both.",
    '"Good night, Alan. Take care of this one for me."',
  ],
  issues: [
    '"Its small gold light moves off between the dark rows of stones" - Leave It Open',
    '"She touches his arm lightly in goodbye" - at level 1 touch goes no further than a greeting',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-26T19:44:00.000Z",
} as const satisfies StoryTurnPlayed
