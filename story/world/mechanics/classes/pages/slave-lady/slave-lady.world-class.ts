import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const slaveLady = {
  id: "01a0657e-0256-70bd-b5be-4e5e11f34a5a",
  type: "page-type/world-class",
  slug: "slave-lady",
  title: "Slave Lady",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
