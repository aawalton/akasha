import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const barista = {
  id: "01a0657e-133b-7199-ac28-adbc87e3e403",
  type: "world-class",
  slug: "barista",
  title: "Barista",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
