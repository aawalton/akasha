import type { WorldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.types.ts"

export const rareQuest = {
  id: "01a0655a-0688-7c9a-adea-c7a784aaaf37",
  type: "page-type/world-quest",
  slug: "rare-quest",
  title: "Rare Quest",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldQuest
