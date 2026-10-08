import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveMindhurt = {
  id: "01a0e9fb-2b65-7430-8808-2a50d69e64fc",
  type: "page-type/world-condition",
  slug: "super-supportive-mindhurt",
  title: "Mindhurt",
  world: "world/super-supportive",
  description: "A condition of the mind caused by stress.",
  createdAt: "2026-09-28T21:45:47.109Z",
  updatedAt: "2026-09-28T21:45:51.000Z",
} as const satisfies WorldCondition
