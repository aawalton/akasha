import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const overwhereIvEmptied = {
  id: "01a0ff6a-9f6d-7b60-b7cb-49624a56451c",
  type: "page-type/world-condition",
  slug: "overwhere-iv-emptied",
  title: "Emptied",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The status of one who has spent the last of their mana: an ache behind the eyes.",
} as const satisfies WorldCondition
