import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveGlossed = {
  id: "01a0e9f3-f5f5-7982-b70c-e7d63decb77d",
  type: "page-type/world-condition",
  slug: "super-supportive-glossed",
  title: "Glossed",
  world: "world/super-supportive",
  description: "The state of being under the Gloss, where luck bends one's way.",
} as const satisfies WorldCondition
