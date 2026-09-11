import type { StoryWritten } from "akasha/story/stories-written/story-written.page-type.types.ts"

export const anthology = {
  id: "01a06585-da9a-79e2-9904-3842ab34d2ab",
  type: "story-written",
  slug: "anthology",
  title: "Anthology",
  world: "personas",
  unit: "words",
  prose: "txt",
} as const satisfies StoryWritten
