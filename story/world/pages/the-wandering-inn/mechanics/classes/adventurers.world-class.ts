import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const adventurers = {
  id: "01a0657e-1326-78eb-b380-b2c86c806022",
  type: "page-type/world-class",
  slug: "adventurers",
  title: "Adventurers",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.390Z",
  updatedAt: "2026-09-22T13:28:25.000Z",
} as const satisfies WorldClass
