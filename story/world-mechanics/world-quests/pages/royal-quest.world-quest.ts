import type { WorldQuest } from "../world-quest.page-type.ts"

export const royalQuest = {
  id: "01a0655a-0688-73dd-b0d8-acefbdff8e3a",
  pageTypeSlug: "world-quest",
  slug: "royal-quest",
  title: "Royal Quest",
  worldSlug: "the-wandering-inn",
} as const satisfies WorldQuest
