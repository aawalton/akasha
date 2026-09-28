import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveTrainingQuest = {
  id: "01a0ea49-94a9-755c-baf4-2946405e83d5",
  type: "page-type/lore",
  slug: "super-supportive-training-quest",
  title: "Training quests",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-training-quest",
  secrets: "jsonl",
} as const satisfies Lore
