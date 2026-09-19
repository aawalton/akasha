import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mercenaryCommander = {
  id: "01a0657e-139f-7ffa-9328-f0e289006375",
  type: "page-type/world-class",
  slug: "mercenary-commander",
  title: "Mercenary Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
