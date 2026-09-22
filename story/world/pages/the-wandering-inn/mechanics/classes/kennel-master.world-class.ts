import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const kennelMaster = {
  id: "01a0657e-020c-7a66-8255-47436e10ceac",
  type: "page-type/world-class",
  slug: "kennel-master",
  title: "Kennel Master",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
