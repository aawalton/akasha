import type { WorldQuest } from "../world-quest.page-type.ts"

export const heroicQuest = {
  id: "01a0655a-0687-77e3-8d5a-163c517a554c",
  pageTypeSlug: "world-quest",
  slug: "heroic-quest",
  title: "Heroic Quest",
  worldSlug: "the-wandering-inn",
} as const satisfies WorldQuest
