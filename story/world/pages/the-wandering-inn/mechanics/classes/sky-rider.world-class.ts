import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const skyRider = {
  id: "01a06586-0a3e-720a-a8bc-a4e14cf18360",
  type: "page-type/world-class",
  slug: "sky-rider",
  title: "Sky Rider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
