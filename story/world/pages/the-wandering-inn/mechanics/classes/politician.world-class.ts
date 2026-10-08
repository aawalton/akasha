import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const politician = {
  id: "01a06586-0a0a-79cf-bf25-7df4ba6f63b8",
  type: "page-type/world-class",
  slug: "politician",
  title: "Politician",
  world: "world/the-wandering-inn",
  appearanceCount: 9,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.346Z",
  updatedAt: "2026-09-22T13:29:51.000Z",
} as const satisfies WorldClass
