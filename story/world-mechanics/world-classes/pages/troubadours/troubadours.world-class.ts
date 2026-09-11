import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const troubadours = {
  id: "01a06586-0a6d-7683-b71d-26c4b4809eaa",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "troubadours",
  title: "Troubadours",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
