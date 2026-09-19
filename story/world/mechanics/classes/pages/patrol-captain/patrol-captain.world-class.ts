import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const patrolCaptain = {
  id: "01a0657e-0236-787d-ad06-28d7d684e973",
  type: "page-type/world-class",
  slug: "patrol-captain",
  title: "Patrol Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
