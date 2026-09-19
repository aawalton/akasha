import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const comeHere = {
  id: "01a06585-da9a-7b5a-8188-3addd04a2fd6",
  type: "page-type/story-written",
  slug: "come-here",
  title: "Come Here",
  world: "world/personas",
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryWritten
