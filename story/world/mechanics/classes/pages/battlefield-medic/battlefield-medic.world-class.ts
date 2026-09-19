import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battlefieldMedic = {
  id: "01a0657e-133d-74c1-8079-1d3400269a8b",
  type: "page-type/world-class",
  slug: "battlefield-medic",
  title: "Battlefield Medic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
