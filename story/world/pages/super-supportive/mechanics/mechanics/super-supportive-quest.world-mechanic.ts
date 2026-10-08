import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveQuest = {
  id: "01a0e9f1-cfc2-7c98-ba7a-1b1a7afa48e3",
  type: "page-type/world-mechanic",
  slug: "super-supportive-quest",
  title: "Quest",
  world: "world/super-supportive",
  aliases: ["assignment", "quest order"],
  description:
    "A set task an Avowed gets from a summoner, with sub-instructions, secondary tasks and ranked people who may give orders.",
  createdAt: "2026-09-28T21:35:33.826Z",
  updatedAt: "2026-09-28T21:35:36.000Z",
} as const satisfies WorldMechanic
