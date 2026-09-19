import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shieldmaidens = {
  id: "01a06586-0a3b-71a5-ba8b-81dd14a68f17",
  type: "page-type/world-class",
  slug: "shieldmaidens",
  title: "Shieldmaidens",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
