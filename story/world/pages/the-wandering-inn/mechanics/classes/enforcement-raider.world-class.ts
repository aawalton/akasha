import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const enforcementRaider = {
  id: "01a0657e-1360-7e31-b58b-0a97038b8472",
  type: "page-type/world-class",
  slug: "enforcement-raider",
  title: "Enforcement Raider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
