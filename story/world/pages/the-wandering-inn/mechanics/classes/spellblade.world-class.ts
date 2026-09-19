import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spellblade = {
  id: "01a06586-0a50-76f4-a097-25fd98932040",
  type: "page-type/world-class",
  slug: "spellblade",
  title: "Spellblade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
