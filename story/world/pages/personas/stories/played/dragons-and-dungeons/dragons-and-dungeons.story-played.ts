import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const dragonsAndDungeons = {
  id: "01a06425-4433-7ef5-b909-fc3115093731",
  type: "page-type/story-played",
  slug: "dragons-and-dungeons",
  title: "Dragons & Dungeons",
  world: "world/personas",
  unit: "unit/words",
  externalId: "dragons-and-dungeons",
  coordinatorAgent: "aria-game-master-dragons-and-dungeons",
  panels: ["game-panel/story-so-far"],
  prose: "txt",
} as const satisfies StoryPlayed
