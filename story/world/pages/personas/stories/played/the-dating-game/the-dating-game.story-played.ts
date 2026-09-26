import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const theDatingGame = {
  id: "01a0de37-a4ce-75e7-b1cc-7be7e09c8244",
  type: "page-type/story-played",
  slug: "the-dating-game",
  title: "The Dating Game",
  world: "world/personas",
  unit: "unit/words",
} as const satisfies StoryPlayed
