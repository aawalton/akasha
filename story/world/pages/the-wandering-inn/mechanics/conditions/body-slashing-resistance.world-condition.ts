import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const bodySlashingResistance = {
  id: "01a0655a-7b7a-7a00-89c0-64924cc9d6ea",
  type: "page-type/world-condition",
  slug: "body-slashing-resistance",
  title: "Body: Slashing Resistance",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.802Z",
  updatedAt: "2026-09-22T13:30:29.000Z",
} as const satisfies WorldCondition
