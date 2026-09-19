import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shipwrights = {
  id: "01a06586-0a3b-7826-bc99-581db86ee033",
  type: "page-type/world-class",
  slug: "shipwrights",
  title: "Shipwrights",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
