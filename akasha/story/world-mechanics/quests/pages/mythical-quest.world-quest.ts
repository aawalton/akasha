import type { WorldQuest } from "../world-quest.page-type.ts"

export const mythicalQuest = {
  id: "01a0655a-0688-764e-b679-2e8865598901",
  pageTypeSlug: "world-quest",
  slug: "mythical-quest",
  title: "Mythical Quest",
  worldSlug: "the-wandering-inn",
} as const satisfies WorldQuest
