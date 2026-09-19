import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const garrisonGeneral = {
  id: "01a0657e-1366-79fa-ae49-165ea7f4403e",
  type: "page-type/world-class",
  slug: "garrison-general",
  title: "Garrison General",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
