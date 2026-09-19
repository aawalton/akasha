import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const legendaryMercenary = {
  id: "01a0657e-138d-7399-9558-a8c099529e1d",
  type: "page-type/world-class",
  slug: "legendary-mercenary",
  title: "Legendary Mercenary",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
