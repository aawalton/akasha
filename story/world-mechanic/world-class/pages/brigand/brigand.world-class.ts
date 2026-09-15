import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const brigand = {
  id: "01a0657e-01c0-786a-8b77-5cfa5f164bae",
  type: "world-class",
  slug: "brigand",
  title: "Brigand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
