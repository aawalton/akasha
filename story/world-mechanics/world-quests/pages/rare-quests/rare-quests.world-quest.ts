import type { WorldQuest } from "akasha/story/world-mechanics/world-quests/world-quest.page-type.types.ts"

export const rareQuests = {
  id: "01a0655a-0688-7653-a304-234de79c9142",
  type: "world-quest",
  slug: "rare-quests",
  title: "Rare Quests",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldQuest
