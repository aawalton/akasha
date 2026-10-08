import type { WorldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.types.ts"

export const rareQuests = {
  id: "01a0655a-0688-7653-a304-234de79c9142",
  type: "page-type/world-quest",
  slug: "rare-quests",
  title: "Rare Quests",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:39:53.864Z",
  updatedAt: "2026-09-22T13:30:33.000Z",
} as const satisfies WorldQuest
