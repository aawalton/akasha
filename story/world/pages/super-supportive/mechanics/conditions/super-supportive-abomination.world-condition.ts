import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveAbomination = {
  id: "01a0e9f3-f5f4-7919-9f7d-346b3bb5a67b",
  type: "page-type/world-condition",
  slug: "super-supportive-abomination",
  title: "Abomination",
  world: "world/super-supportive",
  aliases: ["chaos-generating monster"],
  description: "What an Avowed whose integration or balance fails can become.",
} as const satisfies WorldCondition
