import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spellAmbusher = {
  id: "01a06586-0a50-79c2-8d3c-050920f557c7",
  type: "page-type/world-class",
  slug: "spell-ambusher",
  title: "Spell Ambusher",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
