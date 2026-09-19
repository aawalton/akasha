import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spellscribe = {
  id: "01a0657e-025e-7a23-949c-98fd37f890fb",
  type: "page-type/world-class",
  slug: "spellscribe",
  title: "Spellscribe",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
