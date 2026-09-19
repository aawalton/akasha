import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const frozenCommander = {
  id: "01a0657e-1366-78ae-b949-f52778730fb6",
  type: "page-type/world-class",
  slug: "frozen-commander",
  title: "Frozen Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
