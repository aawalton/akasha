import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gemstoneSmelter = {
  id: "01a0657e-1367-710c-af8a-6f835c72cf23",
  type: "page-type/world-class",
  slug: "gemstone-smelter",
  title: "Gemstone Smelter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
