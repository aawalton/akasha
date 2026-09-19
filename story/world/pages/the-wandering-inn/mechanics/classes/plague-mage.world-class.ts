import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const plagueMage = {
  id: "01a0657e-023d-758e-82a1-9b950d1c352a",
  type: "page-type/world-class",
  slug: "plague-mage",
  title: "Plague Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
