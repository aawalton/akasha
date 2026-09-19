import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gravityMage = {
  id: "01a0657e-136e-70aa-a33c-b2ee00a154d9",
  type: "page-type/world-class",
  slug: "gravity-mage",
  title: "Gravity Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
