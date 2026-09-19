import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const investigator = {
  id: "01a0657e-020b-7fca-9175-2c57fcbb481f",
  type: "page-type/world-class",
  slug: "investigator",
  title: "Investigator",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
