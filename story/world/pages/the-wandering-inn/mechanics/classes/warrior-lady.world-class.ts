import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warriorLady = {
  id: "01a06586-0a72-7b63-8b3a-1ac350d37d4e",
  type: "page-type/world-class",
  slug: "warrior-lady",
  title: "Warrior Lady",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
