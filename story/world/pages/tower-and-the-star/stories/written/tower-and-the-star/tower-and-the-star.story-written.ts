import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const towerAndTheStar = {
  id: "01a06425-4433-7931-8783-614439d0fc4c",
  type: "page-type/story-written",
  slug: "tower-and-the-star",
  title: "Tower And The Star",
  world: "world/tower-and-the-star",
  unit: "unit/words",
  panels: ["played-panel/player-intent"],
} as const satisfies StoryWritten
