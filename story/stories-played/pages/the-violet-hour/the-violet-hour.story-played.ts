import type { StoryPlayed } from "akasha/story/stories-played/story-played.page-type.types.ts"

export const theVioletHour = {
  id: "01a06425-4433-7dbe-8a10-b6a603b54acf",
  type: "story-played",
  slug: "the-violet-hour",
  title: "The Violet Hour",
  world: "personas",
  unit: "words",
  prose: "txt",
} as const satisfies StoryPlayed
