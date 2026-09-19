import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gunScout = {
  id: "01a0657e-01ed-707e-91f2-4d1769c3fddb",
  type: "page-type/world-class",
  slug: "gun-scout",
  title: "Gun Scout",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
