import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bloodMage = {
  id: "01a0657e-01be-7bc7-8648-a11d17980b7a",
  type: "page-type/world-class",
  slug: "blood-mage",
  title: "Blood Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
