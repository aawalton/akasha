import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pegasusRider = {
  id: "01a0657e-13b7-76d4-b2c6-2a8246cfc9a6",
  type: "page-type/world-class",
  slug: "pegasus-rider",
  title: "Pegasus Rider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
