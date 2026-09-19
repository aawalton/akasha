import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const barDrake = {
  id: "01a0657e-01b0-7630-96ed-6b7497395a62",
  type: "page-type/world-class",
  slug: "bar-drake",
  title: "Bar Drake",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
