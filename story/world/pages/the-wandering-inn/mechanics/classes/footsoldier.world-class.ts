import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const footsoldier = {
  id: "01a0657e-01de-78b9-aedb-d2358c68687c",
  type: "page-type/world-class",
  slug: "footsoldier",
  title: "Footsoldier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
