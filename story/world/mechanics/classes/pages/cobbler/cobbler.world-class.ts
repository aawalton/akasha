import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cobbler = {
  id: "01a0657e-134c-749a-992c-8391660f319d",
  type: "page-type/world-class",
  slug: "cobbler",
  title: "Cobbler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
