import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const dateNightFreePlay = {
  id: "01a06425-4433-7092-b28c-302ea31cb896",
  type: "page-type/story-played",
  slug: "date-night-free-play",
  title: "Date Night Free Play",
  world: "world/personas",
  unit: "unit/words",
} as const satisfies StoryPlayed
