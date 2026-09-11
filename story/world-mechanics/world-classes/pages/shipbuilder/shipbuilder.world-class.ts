import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const shipbuilder = {
  id: "01a0657e-0254-7356-b788-5c19a05ca94a",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "shipbuilder",
  title: "Shipbuilder",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
