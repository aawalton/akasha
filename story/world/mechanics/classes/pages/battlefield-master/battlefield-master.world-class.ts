import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battlefieldMaster = {
  id: "01a0657e-01b6-7a74-a97a-f0bf41d73452",
  type: "page-type/world-class",
  slug: "battlefield-master",
  title: "Battlefield Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
