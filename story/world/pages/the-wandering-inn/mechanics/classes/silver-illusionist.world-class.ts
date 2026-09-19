import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const silverIllusionist = {
  id: "01a06586-0a3c-79a1-8c87-be4009d18f5b",
  type: "page-type/world-class",
  slug: "silver-illusionist",
  title: "Silver Illusionist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
