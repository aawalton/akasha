import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fashionista = {
  id: "01a0657e-1363-78d6-ae40-3d7c5dc66fde",
  type: "page-type/world-class",
  slug: "fashionista",
  title: "Fashionista",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
