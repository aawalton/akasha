import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const rotter = {
  id: "01a06586-0a25-751c-afc6-8666cddcc560",
  type: "page-type/world-class",
  slug: "rotter",
  title: "Rotter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
