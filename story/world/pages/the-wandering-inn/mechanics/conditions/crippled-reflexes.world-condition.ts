import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const crippledReflexes = {
  id: "01a0655a-7b7a-7217-b26c-d67f9d13d4c8",
  type: "page-type/world-condition",
  slug: "crippled-reflexes",
  title: "Crippled Reflexes",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.802Z",
  updatedAt: "2026-09-22T13:30:29.000Z",
} as const satisfies WorldCondition
