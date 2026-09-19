import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battlePrincess = {
  id: "01a0657e-133d-7b59-8bcd-d865279f9e1b",
  type: "page-type/world-class",
  slug: "battle-princess",
  title: "Battle Princess",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
