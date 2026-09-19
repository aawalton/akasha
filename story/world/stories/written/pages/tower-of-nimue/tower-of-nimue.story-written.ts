import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const towerOfNimue = {
  id: "01a06585-da9a-7ffa-b6f2-63ad88a53417",
  type: "page-type/story-written",
  slug: "tower-of-nimue",
  title: "The Tower of Nimue",
  world: "world/tower-of-nimue",
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryWritten
