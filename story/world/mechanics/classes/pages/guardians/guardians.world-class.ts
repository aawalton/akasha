import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const guardians = {
  id: "01a0657e-136e-7940-bf36-06ed9e3dbf35",
  type: "page-type/world-class",
  slug: "guardians",
  title: "Guardians",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
