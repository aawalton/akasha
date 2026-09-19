import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const garrisonCommander = {
  id: "01a0657e-01df-7e07-86bf-c0a5079ac532",
  type: "page-type/world-class",
  slug: "garrison-commander",
  title: "Garrison Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
