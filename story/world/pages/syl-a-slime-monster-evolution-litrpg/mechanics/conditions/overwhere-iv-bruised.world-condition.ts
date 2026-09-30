import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const overwhereIvBruised = {
  id: "01a0f258-b8ff-7bbe-aee1-98ac82959b11",
  type: "page-type/world-condition",
  slug: "overwhere-iv-bruised",
  title: "Bruised",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The status of a body knocked hard: sore and stiff where it struck, but unbroken.",
} as const satisfies WorldCondition
