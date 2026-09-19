import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const harpist = {
  id: "01a0657e-01ee-7ee5-a0dc-e3deaddf1e82",
  type: "page-type/world-class",
  slug: "harpist",
  title: "Harpist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
