import type { StoryPlayed } from "akasha/story/stories-played/story-played.page-type.types.ts"

export const theTower = {
  id: "01a06425-4433-7452-bd78-2410fa95fb44",
  type: "story-played",
  slug: "the-tower",
  title: "The Tower",
  world: "personas",
  unit: "words",
} as const satisfies StoryPlayed
