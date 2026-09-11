import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bandits = {
  id: "01a0657e-1339-7c1e-a7d2-711ceb6aa4c7",
  type: "world-class",
  slug: "bandits",
  title: "Bandits",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
