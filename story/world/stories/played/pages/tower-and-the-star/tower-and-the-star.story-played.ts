import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const towerAndTheStar = {
  id: "01a06425-4433-7931-8783-614439d0fc4c",
  type: "page-type/story-played",
  slug: "tower-and-the-star",
  title: "Tower And The Star",
  world: "world/tower-and-the-star",
  unit: "unit/words",
} as const satisfies StoryPlayed
