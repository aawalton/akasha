import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveOfferedFoodRule = {
  id: "01a0e9f3-f5f6-774e-b2b1-bed4a35e856b",
  type: "page-type/world-condition",
  slug: "super-supportive-offered-food-rule",
  title: "Offered-food rule",
  world: "world/super-supportive",
  aliases: ["The cow didn't give it to me"],
  description:
    "A mental wall stopping a person from eating animal products that were not offered to them.",
} as const satisfies WorldCondition
