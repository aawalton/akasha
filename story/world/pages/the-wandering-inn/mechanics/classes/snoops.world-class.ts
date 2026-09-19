import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const snoops = {
  id: "01a06586-0a45-786a-9e19-2053f6c02385",
  type: "page-type/world-class",
  slug: "snoops",
  title: "Snoops",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
