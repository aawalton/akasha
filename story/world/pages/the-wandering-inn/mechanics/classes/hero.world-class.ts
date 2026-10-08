import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hero = {
  id: "01a0657e-01f8-7614-b278-7a0003d4a66f",
  type: "page-type/world-class",
  slug: "hero",
  title: "Hero",
  world: "world/the-wandering-inn",
  appearanceCount: 77,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.992Z",
  updatedAt: "2026-09-22T13:29:12.000Z",
} as const satisfies WorldClass
