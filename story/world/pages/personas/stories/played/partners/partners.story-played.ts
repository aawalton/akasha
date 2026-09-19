import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const partners = {
  id: "01a06425-4433-7655-b718-bd2bf4d44c7a",
  type: "page-type/story-played",
  slug: "partners",
  title: "Partners",
  world: "world/personas",
  unit: "unit/words",
} as const satisfies StoryPlayed
