import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordmaster = {
  id: "01a0657e-0263-791a-bb8e-c626e8bdc07d",
  type: "page-type/world-class",
  slug: "swordmaster",
  title: "Swordmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
