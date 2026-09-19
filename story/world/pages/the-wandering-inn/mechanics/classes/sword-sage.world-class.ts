import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordSage = {
  id: "01a06586-0a61-7ba2-92be-708a393ad824",
  type: "page-type/world-class",
  slug: "sword-sage",
  title: "SWORD SAGE",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
