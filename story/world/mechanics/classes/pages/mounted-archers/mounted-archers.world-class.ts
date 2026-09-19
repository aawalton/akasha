import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mountedArchers = {
  id: "01a0657e-13a3-7888-96cb-9371ace20d73",
  type: "page-type/world-class",
  slug: "mounted-archers",
  title: "Mounted Archers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
