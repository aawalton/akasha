import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fleshMage = {
  id: "01a0657e-01dd-7bad-953d-bb6cec7b8930",
  type: "page-type/world-class",
  slug: "flesh-mage",
  title: "Flesh Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
