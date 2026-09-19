import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spellscourges = {
  id: "01a06586-0a50-7ac4-bbcc-b88a16c39fd2",
  type: "page-type/world-class",
  slug: "spellscourges",
  title: "Spellscourges",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
