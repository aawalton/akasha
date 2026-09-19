import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const carriageDriver = {
  id: "01a0657e-01c2-7461-a283-d369a37f4e5e",
  type: "page-type/world-class",
  slug: "carriage-driver",
  title: "Carriage Driver",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
