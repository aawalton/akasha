import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const potionHealer = {
  id: "01a0657e-023e-7a55-933d-d693ff8bffce",
  type: "world-class",
  slug: "potion-healer",
  title: "Potion Healer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
