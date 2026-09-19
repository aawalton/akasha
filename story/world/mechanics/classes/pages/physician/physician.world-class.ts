import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const physician = {
  id: "01a06586-0a06-754f-b1b0-bb3b8c7f7eec",
  type: "page-type/world-class",
  slug: "physician",
  title: "Physician",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
