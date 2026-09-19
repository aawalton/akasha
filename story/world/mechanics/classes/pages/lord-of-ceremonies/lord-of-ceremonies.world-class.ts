import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lordOfCeremonies = {
  id: "01a0657e-138f-70f1-a58d-5a897d68872a",
  type: "page-type/world-class",
  slug: "lord-of-ceremonies",
  title: "Lord of Ceremonies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
