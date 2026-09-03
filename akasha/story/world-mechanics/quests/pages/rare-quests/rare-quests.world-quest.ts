import type { WorldQuest } from "../../world-quest.page-type.ts"

export const rareQuests = {
  id: "01a0655a-0688-7653-a304-234de79c9142",
  pageTypeSlug: "world-quest",
  slug: "rare-quests",
  title: "Rare Quests",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldQuest
