import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hermit = {
  id: "01a0657e-1373-7dfe-9a35-4b791143a3a0",
  type: "page-type/world-class",
  slug: "hermit",
  title: "Hermit",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
