import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lockdownGrappler = {
  id: "01a0657e-138f-7da6-8bfd-e0050c27b427",
  type: "page-type/world-class",
  slug: "lockdown-grappler",
  title: "Lockdown Grappler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
