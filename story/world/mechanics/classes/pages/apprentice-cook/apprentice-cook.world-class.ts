import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const apprenticeCook = {
  id: "01a0657e-01a8-7799-9455-e6f1ce584654",
  type: "page-type/world-class",
  slug: "apprentice-cook",
  title: "Apprentice Cook",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
