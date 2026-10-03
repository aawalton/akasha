import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const dateNightFreePlay = {
  id: "01a06425-4433-7092-b28c-302ea31cb896",
  type: "page-type/story-written",
  slug: "date-night-free-play",
  title: "Date Night Free Play",
  world: "world/personas",
  unit: "unit/words",
  panels: ["played-panel/player-intent"],
} as const satisfies StoryWritten
