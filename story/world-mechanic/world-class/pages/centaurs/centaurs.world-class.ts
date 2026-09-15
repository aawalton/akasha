import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const centaurs = {
  id: "01a0657e-01c3-73d2-ab12-bf71d871a7dd",
  type: "world-class",
  slug: "centaurs",
  title: "Centaurs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
