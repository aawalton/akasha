import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const saboteurs = {
  id: "01a06586-0a27-73b1-b4a3-0cbed32ed0ee",
  type: "page-type/world-class",
  slug: "saboteurs",
  title: "Saboteurs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
