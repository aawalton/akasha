import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const colonists = {
  id: "01a0657e-01c7-7d9a-b839-f78dcb482ce0",
  type: "page-type/world-class",
  slug: "colonists",
  title: "Colonists",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.943Z",
  updatedAt: "2026-09-22T13:28:49.000Z",
} as const satisfies WorldClass
