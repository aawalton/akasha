import type { WorldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.types.ts"

export const superSupportiveMinorMedicalEmergencyQuest = {
  id: "01a0e9f0-79f4-7ece-abb9-0062969c304d",
  type: "page-type/world-quest",
  slug: "super-supportive-minor-medical-emergency-quest",
  title: "Minor medical emergency",
  world: "world/super-supportive",
  aliases: ["Assist with minor medical emergency"],
  description:
    "An emergency quest to stabilize and transport one injured person, following the summoner on scene.",
  createdAt: "2026-09-28T21:34:06.324Z",
  updatedAt: "2026-09-28T21:34:09.000Z",
} as const satisfies WorldQuest
