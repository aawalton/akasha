import type { WorldQuest } from "../../world-quest.page-type.ts"

export const basicQuest = {
  id: "01a0655a-0687-7a67-b94e-acb9249a12aa",
  pageTypeSlug: "world-quest",
  slug: "basic-quest",
  title: "Basic Quest",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldQuest
