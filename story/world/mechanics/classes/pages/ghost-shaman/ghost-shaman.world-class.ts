import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const ghostShaman = {
  id: "01a0657e-136b-7083-a78e-6c2607478051",
  type: "page-type/world-class",
  slug: "ghost-shaman",
  title: "Ghost Shaman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
