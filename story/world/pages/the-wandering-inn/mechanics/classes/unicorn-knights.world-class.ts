import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const unicornKnights = {
  id: "01a06586-0a6e-798e-8e28-8d2b98bd44df",
  type: "page-type/world-class",
  slug: "unicorn-knights",
  title: "Unicorn Knights",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.446Z",
  updatedAt: "2026-09-22T13:30:22.000Z",
} as const satisfies WorldClass
