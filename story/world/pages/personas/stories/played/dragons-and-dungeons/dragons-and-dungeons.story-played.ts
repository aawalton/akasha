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
  chapterBreak: "A session at the table ends.",
  panels: ["played-panel/time", "played-panel/story-so-far", "played-panel/player-intent"],
  prose: "txt",
  createdAt: "2026-09-02T22:02:39.027Z",
  updatedAt: "2026-10-03T21:27:44.000Z",
} as const satisfies StoryPlayed
