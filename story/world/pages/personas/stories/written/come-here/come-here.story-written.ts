import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const comeHere = {
  id: "01a06585-da9a-7b5a-8188-3addd04a2fd6",
  type: "page-type/story-written",
  slug: "come-here",
  title: "Come Here",
  world: "world/personas",
  unit: "unit/words",
  prose: "txt",
  panels: ["played-panel/player-intent"],
  createdAt: "2026-09-03T04:27:46.202Z",
  updatedAt: "2026-10-03T21:27:44.000Z",
} as const satisfies StoryWritten
