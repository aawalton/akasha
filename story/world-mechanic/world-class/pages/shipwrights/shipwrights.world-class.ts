import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const shipwrights = {
  id: "01a06586-0a3b-7826-bc99-581db86ee033",
  type: "world-class",
  slug: "shipwrights",
  title: "Shipwrights",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
