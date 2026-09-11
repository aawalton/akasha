import type { WorldQuest } from "akasha/story/world-mechanics/world-quests/world-quest.page-type.types.ts"

export const basicQuest = {
  id: "01a0655a-0687-7a67-b94e-acb9249a12aa",
  type: "world-quest",
  slug: "basic-quest",
  title: "Basic Quest",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldQuest
