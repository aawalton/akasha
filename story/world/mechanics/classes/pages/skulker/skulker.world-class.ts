import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const skulker = {
  id: "01a0657e-0256-74bf-8b53-a53282de1f5d",
  type: "page-type/world-class",
  slug: "skulker",
  title: "Skulker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
