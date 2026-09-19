import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spearfighters = {
  id: "01a0657e-025d-70bc-84f9-46be4f5c0055",
  type: "page-type/world-class",
  slug: "spearfighters",
  title: "Spearfighters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
