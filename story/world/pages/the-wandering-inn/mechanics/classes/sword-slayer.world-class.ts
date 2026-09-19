import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordSlayer = {
  id: "01a06586-0a61-7f13-ad81-17eae96e6366",
  type: "page-type/world-class",
  slug: "sword-slayer",
  title: "Sword Slayer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
