import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shieldCompanion = {
  id: "01a06586-0a3a-773c-8fc9-4582d82a82e4",
  type: "page-type/world-class",
  slug: "shield-companion",
  title: "Shield Companion",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/guardsman"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.394Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
