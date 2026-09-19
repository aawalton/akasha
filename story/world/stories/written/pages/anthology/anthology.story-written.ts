import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const anthology = {
  id: "01a06585-da9a-79e2-9904-3842ab34d2ab",
  type: "page-type/story-written",
  slug: "anthology",
  title: "Anthology",
  world: "world/personas",
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryWritten
