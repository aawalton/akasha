import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const councilmembers = {
  id: "01a0657e-134f-7286-aad4-dd25879daf91",
  type: "page-type/world-class",
  slug: "councilmembers",
  title: "Councilmembers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
