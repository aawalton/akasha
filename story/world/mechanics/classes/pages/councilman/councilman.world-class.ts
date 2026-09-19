import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const councilman = {
  id: "01a0657e-134f-7f6c-8480-725b086ed297",
  type: "page-type/world-class",
  slug: "councilman",
  title: "Councilman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
