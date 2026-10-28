import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const skillLockProbe00001 = {
  id: "01a17ff8-fb42-7b93-8352-be712c22978d",
  type: "page-type/story-turn-played",
  slug: "skill-lock-probe-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/skill-lock-probe"],
  position: 1,
  prose: "txt",
  characters: ["character-player/skill-lock-probe-player"],
  stepStatus: "step-status/player",
  action: "I draw my sword and cut the taper on the counter in half.",
  ownLength: 41,
  createdAt: "2026-10-28T00:46:26.113Z",
  updatedAt: "2026-10-28T00:46:26.113Z",
} as const satisfies StoryTurnPlayed
