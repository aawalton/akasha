import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const retainer = {
  id: "01a06586-0a21-70ca-bdf8-8216c09d0f4f",
  type: "page-type/world-class",
  slug: "retainer",
  title: "Retainer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
