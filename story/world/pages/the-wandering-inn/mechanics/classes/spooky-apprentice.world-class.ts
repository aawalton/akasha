import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spookyApprentice = {
  id: "01a0657e-025e-7505-9420-400bebd0d086",
  type: "page-type/world-class",
  slug: "spooky-apprentice",
  title: "Spooky Apprentice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
