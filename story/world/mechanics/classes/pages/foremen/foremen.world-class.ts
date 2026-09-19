import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const foremen = {
  id: "01a0657e-1366-7f9b-a8a4-39fbb55da060",
  type: "page-type/world-class",
  slug: "foremen",
  title: "Foremen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
