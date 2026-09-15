import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const majordomo = {
  id: "01a0657e-139d-74a6-968b-63d33cfd7110",
  type: "world-class",
  slug: "majordomo",
  title: "Majordomo",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
