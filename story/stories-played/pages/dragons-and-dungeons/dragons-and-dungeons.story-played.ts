import type { StoryPlayed } from "akasha/story/stories-played/story-played.page-type.types.ts"

export const dragonsAndDungeons = {
  id: "01a06425-4433-7ef5-b909-fc3115093731",
  type: "story-played",
  slug: "dragons-and-dungeons",
  title: "Dragons & Dungeons",
  world: "personas",
  unit: "words",
  prose: "txt",
} as const satisfies StoryPlayed
