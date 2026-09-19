import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const beekeepers = {
  id: "01a0657e-133d-704d-9d6e-1230be7e5302",
  type: "page-type/world-class",
  slug: "beekeepers",
  title: "Beekeepers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
