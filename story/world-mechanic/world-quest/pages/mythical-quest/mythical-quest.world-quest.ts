import type { WorldQuest } from "akasha/story/world-mechanic/world-quest/world-quest.page-type.types.ts"

export const mythicalQuest = {
  id: "01a0655a-0688-764e-b679-2e8865598901",
  type: "world-quest",
  slug: "mythical-quest",
  title: "Mythical Quest",
  world: "world/the-wandering-inn",
} as const satisfies WorldQuest
