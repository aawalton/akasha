import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const haremHotel = {
  id: "01a06425-4433-7e95-ad6a-45d83fdf02ef",
  type: "page-type/story-played",
  slug: "harem-hotel",
  title: "Harem Hotel",
  world: "world/personas",
  unit: "unit/words",
} as const satisfies StoryPlayed
