import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gangBoss = {
  id: "01a0657e-01df-78f6-852d-471e095e7bff",
  type: "page-type/world-class",
  slug: "gang-boss",
  title: "Gang Boss",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.967Z",
  updatedAt: "2026-09-22T13:29:04.000Z",
} as const satisfies WorldClass
