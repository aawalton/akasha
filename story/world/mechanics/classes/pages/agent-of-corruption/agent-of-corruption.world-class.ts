import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const agentOfCorruption = {
  id: "01a0657e-1327-7bfa-8ceb-76670f64dbb5",
  type: "page-type/world-class",
  slug: "agent-of-corruption",
  title: "Agent of Corruption",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
