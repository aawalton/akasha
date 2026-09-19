import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const archdruid = {
  id: "01a0657e-01a9-732a-98a3-3d3f123c187b",
  type: "page-type/world-class",
  slug: "archdruid",
  title: "Archdruid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
