import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chiefEngineer = {
  id: "01a0657e-01c4-7c45-9278-4c1fe635c6ef",
  type: "page-type/world-class",
  slug: "chief-engineer",
  title: "Chief Engineer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
