import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordDancer = {
  id: "01a06586-0a60-72f4-b81b-e0a6b04c39bf",
  type: "page-type/world-class",
  slug: "sword-dancer",
  title: "Sword Dancer",
  world: "world/the-wandering-inn",
  appearanceCount: 20,
  aliases: ["sword-dancers"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.432Z",
  updatedAt: "2026-09-22T13:30:14.000Z",
} as const satisfies WorldClass
