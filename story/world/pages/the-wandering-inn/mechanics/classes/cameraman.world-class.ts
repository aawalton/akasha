import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cameraman = {
  id: "01a0657e-1342-76c8-92e5-ca9f92ea877c",
  type: "page-type/world-class",
  slug: "cameraman",
  title: "Cameraman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
