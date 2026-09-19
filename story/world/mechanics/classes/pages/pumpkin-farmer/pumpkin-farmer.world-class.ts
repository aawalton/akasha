import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pumpkinFarmer = {
  id: "01a0657e-0241-7c52-9162-86a6ed6b781a",
  type: "page-type/world-class",
  slug: "pumpkin-farmer",
  title: "Pumpkin Farmer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
