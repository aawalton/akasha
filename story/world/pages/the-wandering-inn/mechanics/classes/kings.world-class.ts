import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const kings = {
  id: "01a0657e-020c-7af4-b10f-e5fa2b65f90f",
  type: "page-type/world-class",
  slug: "kings",
  title: "Kings",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
