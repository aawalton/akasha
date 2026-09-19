import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cupbearer = {
  id: "01a0657e-01ce-77e3-afd6-56e5868f786f",
  type: "page-type/world-class",
  slug: "cupbearer",
  title: "Cupbearer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
