import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const theTower = {
  id: "01a06425-4433-7452-bd78-2410fa95fb44",
  type: "page-type/story-played",
  slug: "the-tower",
  title: "The Tower",
  world: "world/personas",
  unit: "unit/words",
} as const satisfies StoryPlayed
