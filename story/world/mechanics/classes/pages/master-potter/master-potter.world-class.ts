import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const masterPotter = {
  id: "01a0657e-022f-7e22-8c82-585b1691085b",
  type: "page-type/world-class",
  slug: "master-potter",
  title: "Master Potter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
