import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const dateNightTheReadingRoom = {
  id: "01a06425-4433-7d9d-9e93-330d36ad90d4",
  type: "page-type/story-written",
  slug: "date-night-the-reading-room",
  title: "Date Night The Reading Room",
  world: "world/personas",
  unit: "unit/words",
  panels: ["played-panel/player-intent"],
} as const satisfies StoryWritten
