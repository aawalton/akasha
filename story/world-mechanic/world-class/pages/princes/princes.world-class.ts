import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const princes = {
  id: "01a06586-0a0e-7366-89dd-fcf77abaf221",
  type: "world-class",
  slug: "princes",
  title: "Princes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
