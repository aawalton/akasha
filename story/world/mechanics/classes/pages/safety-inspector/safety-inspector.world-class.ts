import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const safetyInspector = {
  id: "01a06586-0a27-731b-be0b-83f7325358a8",
  type: "page-type/world-class",
  slug: "safety-inspector",
  title: "Safety Inspector",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
