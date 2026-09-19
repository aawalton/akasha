import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const galleyChef = {
  id: "01a0657e-01df-7f2c-a66c-51bd597b4a28",
  type: "page-type/world-class",
  slug: "galley-chef",
  title: "Galley Chef",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
