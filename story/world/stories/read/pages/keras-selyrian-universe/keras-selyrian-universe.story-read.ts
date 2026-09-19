import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const kerasSelyrianUniverse = {
  id: "01a0657d-ada7-7e1b-afec-47276cb560ae",
  type: "page-type/story-read",
  slug: "keras-selyrian-universe",
  title: "Keras Selyrian Universe",
  world: "world/keras-selyrian-universe",
  unit: "unit/words",
} as const satisfies StoryRead
