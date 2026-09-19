import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spearDrake = {
  id: "01a06586-0a4e-73c9-af86-59586313e21a",
  type: "page-type/world-class",
  slug: "spear-drake",
  title: "Spear Drake",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
