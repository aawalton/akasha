import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const vanguard = {
  id: "01a06586-0a6e-747d-95d9-77fba4e35501",
  type: "page-type/world-class",
  slug: "vanguard",
  title: "Vanguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
