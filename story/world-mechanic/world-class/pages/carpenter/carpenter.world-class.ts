import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const carpenter = {
  id: "01a0657e-1346-763a-8607-ef776ca111a3",
  type: "world-class",
  slug: "carpenter",
  title: "Carpenter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
