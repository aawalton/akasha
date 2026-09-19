import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const poser = {
  id: "01a06586-0a0b-7809-8a46-ab83b30eff4a",
  type: "page-type/world-class",
  slug: "poser",
  title: "Poser",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
