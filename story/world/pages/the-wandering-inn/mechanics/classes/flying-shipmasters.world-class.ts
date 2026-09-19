import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const flyingShipmasters = {
  id: "01a0657e-1365-7cbc-b43c-29097938b276",
  type: "page-type/world-class",
  slug: "flying-shipmasters",
  title: "Flying Shipmasters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
