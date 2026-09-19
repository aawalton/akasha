import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battlefieldHealers = {
  id: "01a0657e-133d-7bcb-9fa1-646d1d5d29df",
  type: "page-type/world-class",
  slug: "battlefield-healers",
  title: "Battlefield Healers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
