import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const peasant = {
  id: "01a0657e-0237-70e4-8207-3ed46b8b8e39",
  type: "page-type/world-class",
  slug: "peasant",
  title: "Peasant",
  world: "world/the-wandering-inn",
  appearanceCount: 16,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.055Z",
  updatedAt: "2026-09-22T13:29:43.000Z",
} as const satisfies WorldClass
