import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gunsmith = {
  id: "01a0657e-1370-7ab7-b461-f6d14e01dcc9",
  type: "page-type/world-class",
  slug: "gunsmith",
  title: "Gunsmith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
