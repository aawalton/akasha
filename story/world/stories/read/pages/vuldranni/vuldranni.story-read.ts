import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const vuldranni = {
  id: "01a0657d-ada7-7d71-ad0b-51fd429b078e",
  type: "page-type/story-read",
  slug: "vuldranni",
  title: "Vuldranni",
  world: "world/vuldranni",
  rank: "B",
  tags: ["Comedy"],
  unit: "unit/words",
} as const satisfies StoryRead
