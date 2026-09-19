import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mayors = {
  id: "01a0657e-139f-722d-bff6-c218980fa2ed",
  type: "page-type/world-class",
  slug: "mayors",
  title: "Mayors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
