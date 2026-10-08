import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const drinker = {
  id: "01a0657e-01d1-78e6-8345-532e89d91b4d",
  type: "page-type/world-class",
  slug: "drinker",
  title: "Drinker",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.953Z",
  updatedAt: "2026-09-22T13:28:56.000Z",
} as const satisfies WorldClass
