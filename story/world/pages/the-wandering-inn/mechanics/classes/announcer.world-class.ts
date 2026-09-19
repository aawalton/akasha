import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const announcer = {
  id: "01a0657e-132c-7f46-b0af-9af3636a0060",
  type: "page-type/world-class",
  slug: "announcer",
  title: "Announcer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
