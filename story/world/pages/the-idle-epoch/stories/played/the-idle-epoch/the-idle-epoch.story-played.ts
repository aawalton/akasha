import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const theIdleEpoch = {
  id: "01a06425-4433-7e65-a585-6b7af5d47ee8",
  type: "page-type/story-played",
  slug: "the-idle-epoch",
  title: "The Idle Epoch",
  world: "world/the-idle-epoch",
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryPlayed
