import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const overwhereIvDrained = {
  id: "01a0ff03-c2c6-7310-9732-26978a593ef1",
  type: "page-type/world-condition",
  slug: "overwhere-iv-drained",
  title: "Drained",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The status of one whose mana runs low: a dull headache and heavy limbs.",
  createdAt: "2026-10-02T23:47:11.686Z",
  updatedAt: "2026-10-02T23:47:22.000Z",
} as const satisfies WorldCondition
