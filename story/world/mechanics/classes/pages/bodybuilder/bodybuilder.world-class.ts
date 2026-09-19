import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bodybuilder = {
  id: "01a0657e-01bf-7256-8a0b-5dc806bf852a",
  type: "page-type/world-class",
  slug: "bodybuilder",
  title: "Bodybuilder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
