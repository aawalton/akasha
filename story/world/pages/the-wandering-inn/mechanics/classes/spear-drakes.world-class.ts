import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spearDrakes = {
  id: "01a0657e-025d-7e8d-bce6-0a5cf71a96ca",
  type: "page-type/world-class",
  slug: "spear-drakes",
  title: "Spear Drakes",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
