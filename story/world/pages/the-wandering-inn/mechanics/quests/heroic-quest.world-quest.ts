import type { WorldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.types.ts"

export const heroicQuest = {
  id: "01a0655a-0687-77e3-8d5a-163c517a554c",
  type: "page-type/world-quest",
  slug: "heroic-quest",
  title: "Heroic Quest",
  world: "world/the-wandering-inn",
  createdAt: "2026-09-03T03:39:53.863Z",
  updatedAt: "2026-09-19T16:18:20.000Z",
} as const satisfies WorldQuest
