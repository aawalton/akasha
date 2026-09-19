import type { StoryRead } from "akasha/story/world/stories/read/story-read.page-type.types.ts"

export const divineDungeonUniverse = {
  id: "01a0657d-ada7-75ec-8945-395491b18544",
  type: "page-type/story-read",
  slug: "divine-dungeon-universe",
  title: "Divine Dungeon Universe",
  world: "world/divine-dungeon-universe",
  unit: "unit/words",
} as const satisfies StoryRead
