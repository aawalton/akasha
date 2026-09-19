import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const coliseumMaster = {
  id: "01a0657e-134c-765b-9b4f-851e7581d194",
  type: "page-type/world-class",
  slug: "coliseum-master",
  title: "Coliseum Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
