import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const doomguard = {
  id: "01a0657e-1356-704b-90da-f20f90b54afe",
  type: "page-type/world-class",
  slug: "doomguard",
  title: "Doomguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
