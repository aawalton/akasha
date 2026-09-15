import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const stormBandits = {
  id: "01a06586-0a54-765b-9476-80d590af0107",
  type: "world-class",
  slug: "storm-bandits",
  title: "Storm Bandits",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
