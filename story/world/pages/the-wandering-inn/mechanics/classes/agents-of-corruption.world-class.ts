import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const agentsOfCorruption = {
  id: "01a0657e-1327-79b7-9514-bc2be7306b0b",
  type: "page-type/world-class",
  slug: "agents-of-corruption",
  title: "Agents of Corruption",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
