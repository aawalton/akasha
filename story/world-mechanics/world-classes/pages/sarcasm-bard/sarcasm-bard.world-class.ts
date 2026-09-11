import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const sarcasmBard = {
  id: "01a06586-0a2a-7b03-b733-7dfe018d0569",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "sarcasm-bard",
  title: "Sarcasm Bard",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
