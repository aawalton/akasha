import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const ritualMagi = {
  id: "01a06586-0a23-7215-96b1-25705dd48936",
  type: "page-type/world-class",
  slug: "ritual-magi",
  title: "Ritual Magi",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
