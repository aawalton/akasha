import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const herbalists = {
  id: "01a0657e-01f6-7d88-8f3f-b3d3705ab6ff",
  type: "page-type/world-class",
  slug: "herbalists",
  title: "Herbalists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
