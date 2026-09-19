import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const longbowCaptain = {
  id: "01a0657e-138f-7a3e-8aa7-6dabb9ea37b5",
  type: "page-type/world-class",
  slug: "longbow-captain",
  title: "Longbow Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
