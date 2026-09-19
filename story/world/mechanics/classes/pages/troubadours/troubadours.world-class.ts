import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const troubadours = {
  id: "01a06586-0a6d-7683-b71d-26c4b4809eaa",
  type: "page-type/world-class",
  slug: "troubadours",
  title: "Troubadours",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
