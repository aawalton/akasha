import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const villagers = {
  id: "01a0657e-026f-7fca-b4af-b5938d8fcfa8",
  type: "page-type/world-class",
  slug: "villagers",
  title: "Villagers",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.111Z",
  updatedAt: "2026-09-22T13:30:22.000Z",
} as const satisfies WorldClass
