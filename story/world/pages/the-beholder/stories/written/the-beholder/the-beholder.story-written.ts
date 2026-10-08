import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const theBeholder = {
  id: "01a06585-da9a-7a0d-a8d3-1b2a5579ee31",
  type: "page-type/story-written",
  slug: "the-beholder",
  title: "The Beholder",
  world: "world/the-beholder",
  unit: "unit/words",
  panels: ["played-panel/player-intent"],
  createdAt: "2026-09-03T04:27:46.202Z",
  updatedAt: "2026-10-03T21:27:44.000Z",
} as const satisfies StoryWritten
