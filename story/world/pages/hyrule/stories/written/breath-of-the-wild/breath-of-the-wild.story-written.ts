import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const breathOfTheWild = {
  id: "01a06425-4433-7b40-bbb6-17c24f7a35ed",
  type: "page-type/story-written",
  slug: "breath-of-the-wild",
  title: "Breath of the Wild: The Chronicle of Hyrule",
  world: "world/hyrule",
  unit: "unit/words",
  panels: ["played-panel/player-intent"],
  createdAt: "2026-09-02T22:02:39.027Z",
  updatedAt: "2026-10-03T21:27:44.000Z",
} as const satisfies StoryWritten
