import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const saboteur = {
  id: "01a0657e-0249-70ad-a888-980744b333c5",
  type: "page-type/world-class",
  slug: "saboteur",
  title: "Saboteur",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
