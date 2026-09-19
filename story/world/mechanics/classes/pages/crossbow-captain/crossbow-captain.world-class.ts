import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const crossbowCaptain = {
  id: "01a0657e-01cc-7264-aa98-084653606418",
  type: "page-type/world-class",
  slug: "crossbow-captain",
  title: "Crossbow Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
