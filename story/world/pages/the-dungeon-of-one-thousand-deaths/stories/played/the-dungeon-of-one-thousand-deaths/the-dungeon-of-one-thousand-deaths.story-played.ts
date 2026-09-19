import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const theDungeonOfOneThousandDeaths = {
  id: "01a06425-4433-77dd-868e-5f9db9a63774",
  type: "page-type/story-played",
  slug: "the-dungeon-of-one-thousand-deaths",
  title: "The Dungeon of One Thousand Deaths",
  world: "world/the-dungeon-of-one-thousand-deaths",
  unit: "unit/words",
} as const satisfies StoryPlayed
