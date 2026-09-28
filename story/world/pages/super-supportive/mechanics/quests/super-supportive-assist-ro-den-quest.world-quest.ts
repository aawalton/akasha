import type { WorldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.types.ts"

export const superSupportiveAssistRoDenQuest = {
  id: "01a0e9f0-79f4-7a8e-8ef4-aa7ec1806f0e",
  type: "page-type/world-quest",
  slug: "super-supportive-assist-ro-den-quest",
  title: "Assist Superior Professor Worli Ro-den in Lab 7",
  world: "world/super-supportive",
  description: "A quest to assist a professor in his lab.",
} as const satisfies WorldQuest
