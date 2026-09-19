import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const emissaries = {
  id: "01a0657e-01d6-7867-90f8-ccda75fd95d3",
  type: "page-type/world-class",
  slug: "emissaries",
  title: "Emissaries",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
