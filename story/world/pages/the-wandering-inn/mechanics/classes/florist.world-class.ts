import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const florist = {
  id: "01a0657e-01dd-7a78-9de8-67cbfb996efc",
  type: "page-type/world-class",
  slug: "florist",
  title: "Florist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
