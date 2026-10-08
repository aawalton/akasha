import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pillagers = {
  id: "01a06586-0a06-7e0b-ac6c-7a01fcbb4219",
  type: "page-type/world-class",
  slug: "pillagers",
  title: "Pillagers",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.342Z",
  updatedAt: "2026-09-22T13:29:43.000Z",
} as const satisfies WorldClass
