import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const patisserie = {
  id: "01a0657e-0236-72ca-9d98-6f6b65c8049d",
  type: "world-class",
  slug: "patisserie",
  title: "Patisserie",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
