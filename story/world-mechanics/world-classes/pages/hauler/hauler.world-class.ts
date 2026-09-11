import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const hauler = {
  id: "01a0657e-1370-7bd0-ba68-19a106ece37e",
  type: "world-class",
  slug: "hauler",
  title: "Hauler",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
