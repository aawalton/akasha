import type { WorldQuest } from "akasha/story/world-mechanics/world-quests/world-quest.page-type.types.ts"

export const royalQuest = {
  id: "01a0655a-0688-73dd-b0d8-acefbdff8e3a",
  type: "world-quest",
  slug: "royal-quest",
  title: "Royal Quest",
  world: "the-wandering-inn",
} as const satisfies WorldQuest
