import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const theVioletHour = {
  id: "01a06425-4433-7dbe-8a10-b6a603b54acf",
  type: "page-type/story-written",
  slug: "the-violet-hour",
  title: "The Violet Hour",
  world: "world/personas",
  unit: "unit/words",
  prose: "txt",
  panels: ["played-panel/player-intent"],
} as const satisfies StoryWritten
