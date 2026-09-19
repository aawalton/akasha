import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spellsword = {
  id: "01a06586-0a50-7434-a771-e8068a610aab",
  type: "page-type/world-class",
  slug: "spellsword",
  title: "Spellsword",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
