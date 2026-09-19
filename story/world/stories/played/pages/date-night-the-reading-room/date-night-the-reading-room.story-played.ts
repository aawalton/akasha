import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const dateNightTheReadingRoom = {
  id: "01a06425-4433-7d9d-9e93-330d36ad90d4",
  type: "page-type/story-played",
  slug: "date-night-the-reading-room",
  title: "Date Night The Reading Room",
  world: "world/personas",
  unit: "unit/words",
} as const satisfies StoryPlayed
