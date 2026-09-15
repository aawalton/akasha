import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const bikeMechanic = {
  id: "01a0657e-01bb-76a9-b4f7-304528393250",
  type: "world-class",
  slug: "bike-mechanic",
  title: "Bike Mechanic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
