import type { WorldQuest } from "../../world-quest.page-type.ts"

export const rareQuest = {
  id: "01a0655a-0688-7c9a-adea-c7a784aaaf37",
  pageTypeSlug: "world-quest",
  slug: "rare-quest",
  title: "Rare Quest",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldQuest
