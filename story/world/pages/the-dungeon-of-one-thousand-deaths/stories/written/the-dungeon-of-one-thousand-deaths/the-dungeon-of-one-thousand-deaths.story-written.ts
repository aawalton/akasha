import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const theDungeonOfOneThousandDeaths = {
  id: "01a06425-4433-77dd-868e-5f9db9a63774",
  type: "page-type/story-written",
  slug: "the-dungeon-of-one-thousand-deaths",
  title: "The Dungeon of One Thousand Deaths",
  world: "world/the-dungeon-of-one-thousand-deaths",
  unit: "unit/words",
  panels: ["played-panel/player-intent"],
} as const satisfies StoryWritten
