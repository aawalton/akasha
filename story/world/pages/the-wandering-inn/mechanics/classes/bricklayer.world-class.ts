import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bricklayer = {
  id: "01a0657e-1340-738c-bc52-46efc0d543e9",
  type: "page-type/world-class",
  slug: "bricklayer",
  title: "Bricklayer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
