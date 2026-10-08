import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const securityPersonnel = {
  id: "01a06586-0a2e-7b5b-8978-875564f75901",
  type: "page-type/world-class",
  slug: "security-personnel",
  title: "Security Personnel",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.382Z",
  updatedAt: "2026-09-22T13:29:59.000Z",
} as const satisfies WorldClass
