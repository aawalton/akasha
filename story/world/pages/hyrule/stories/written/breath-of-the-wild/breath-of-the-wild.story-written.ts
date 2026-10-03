import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const breathOfTheWild = {
  id: "01a06425-4433-7b40-bbb6-17c24f7a35ed",
  type: "page-type/story-written",
  slug: "breath-of-the-wild",
  title: "Breath of the Wild: The Chronicle of Hyrule",
  world: "world/hyrule",
  unit: "unit/words",
  panels: ["played-panel/player-intent"],
} as const satisfies StoryWritten
