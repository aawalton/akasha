import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveQuest = {
  id: "01a0e9fc-7b33-7caa-904e-ac7ee84e857c",
  type: "page-type/lore",
  slug: "super-supportive-quest",
  title: "Quests",
  world: "world/super-supportive",
  about: "world-mechanic/super-supportive-quest",
  secrets: "jsonl",
} as const satisfies Lore
