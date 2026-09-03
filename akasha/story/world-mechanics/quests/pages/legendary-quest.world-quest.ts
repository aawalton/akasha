import type { WorldQuest } from "../world-quest.page-type.ts"

export const legendaryQuest = {
  id: "01a0655a-0688-72f0-8d16-874303f95a54",
  pageTypeSlug: "world-quest",
  slug: "legendary-quest",
  title: "Legendary Quest",
  worldSlug: "the-wandering-inn",
} as const satisfies WorldQuest
