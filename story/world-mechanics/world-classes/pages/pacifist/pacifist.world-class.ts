import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const pacifist = {
  id: "01a0657e-0235-7f4a-be55-e20b4c5d79a2",
  type: "world-class",
  slug: "pacifist",
  title: "Pacifist",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
