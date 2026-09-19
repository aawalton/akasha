import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fashionistas = {
  id: "01a0657e-01db-7851-93a8-f3dac44d4408",
  type: "page-type/world-class",
  slug: "fashionistas",
  title: "Fashionistas",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
