import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const prisoner = {
  id: "01a06586-0a18-77c6-b17a-c1bba95e5e1d",
  type: "page-type/world-class",
  slug: "prisoner",
  title: "Prisoner",
  world: "world/the-wandering-inn",
  appearanceCount: 15,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.360Z",
  updatedAt: "2026-09-22T13:29:51.000Z",
} as const satisfies WorldClass
