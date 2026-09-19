import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sorcerers = {
  id: "01a0657e-025c-7c08-8349-ba6a0487aa1a",
  type: "page-type/world-class",
  slug: "sorcerers",
  title: "Sorcerers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
