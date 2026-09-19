import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shipbuilders = {
  id: "01a06586-0a3b-7996-8b68-9235013dde89",
  type: "page-type/world-class",
  slug: "shipbuilders",
  title: "Shipbuilders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
