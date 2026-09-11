import type { WorldCondition } from "akasha/story/world-mechanics/world-conditions/world-condition.page-type.types.ts"

export const bodySlashingResistance = {
  id: "01a0655a-7b7a-7a00-89c0-64924cc9d6ea",
  type: "world-condition",
  slug: "body-slashing-resistance",
  title: "Body: Slashing Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
