import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const suaveLord = {
  id: "01a06586-0a5e-7e47-b3eb-0cda29145abd",
  type: "page-type/world-class",
  slug: "suave-lord",
  title: "Suave Lord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
