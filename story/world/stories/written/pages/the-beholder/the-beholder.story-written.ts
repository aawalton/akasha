import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const theBeholder = {
  id: "01a06585-da9a-7a0d-a8d3-1b2a5579ee31",
  type: "page-type/story-written",
  slug: "the-beholder",
  title: "The Beholder",
  world: "world/the-beholder",
  unit: "unit/words",
} as const satisfies StoryWritten
