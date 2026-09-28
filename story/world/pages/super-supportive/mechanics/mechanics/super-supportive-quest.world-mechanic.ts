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
} as const satisfies WorldMechanic
