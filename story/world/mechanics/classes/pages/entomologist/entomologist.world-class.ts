import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const entomologist = {
  id: "01a0657e-01d9-752e-aa91-5ec5ad4857e0",
  type: "page-type/world-class",
  slug: "entomologist",
  title: "Entomologist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
