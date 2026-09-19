import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fortuneTellers = {
  id: "01a0657e-01de-705d-8e7d-d3c268edbc40",
  type: "page-type/world-class",
  slug: "fortune-tellers",
  title: "Fortune Tellers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
