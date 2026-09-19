import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const darkKnight = {
  id: "01a0657e-01ce-79d6-8728-993e5c902d7b",
  type: "page-type/world-class",
  slug: "dark-knight",
  title: "Dark Knight",
  world: "world/the-wandering-inn",
} as const satisfies WorldClass
