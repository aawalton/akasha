import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knifeFighter = {
  id: "01a0657e-137c-7537-9b78-bc20930131a3",
  type: "page-type/world-class",
  slug: "knife-fighter",
  title: "Knife Fighter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
