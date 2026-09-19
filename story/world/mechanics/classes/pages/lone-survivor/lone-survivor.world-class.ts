import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const loneSurvivor = {
  id: "01a0657e-021b-716a-9ee3-469bb7722826",
  type: "page-type/world-class",
  slug: "lone-survivor",
  title: "Lone Survivor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
