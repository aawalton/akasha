import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const bathhouseConfession = {
  id: "01a06585-da9a-7074-91cd-66e18bfebb1a",
  type: "page-type/story-written",
  slug: "bathhouse-confession",
  title: "Bathhouse Confession",
  world: "world/bathhouse-confession",
  unit: "unit/words",
  panels: ["played-panel/player-intent"],
  createdAt: "2026-09-03T04:27:46.202Z",
  updatedAt: "2026-10-03T21:27:44.000Z",
} as const satisfies StoryWritten
