import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const airbaseCommander = {
  id: "01a0657e-1327-77f2-91e4-a9e4d194db29",
  type: "page-type/world-class",
  slug: "airbase-commander",
  title: "Airbase Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
