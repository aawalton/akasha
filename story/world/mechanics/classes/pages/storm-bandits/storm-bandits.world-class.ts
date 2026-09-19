import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stormBandits = {
  id: "01a06586-0a54-765b-9476-80d590af0107",
  type: "page-type/world-class",
  slug: "storm-bandits",
  title: "Storm Bandits",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
