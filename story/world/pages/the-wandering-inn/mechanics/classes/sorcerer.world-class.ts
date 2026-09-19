import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sorcerer = {
  id: "01a06586-0a4d-7e4d-be22-994881ef505d",
  type: "page-type/world-class",
  slug: "sorcerer",
  title: "Sorcerer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
