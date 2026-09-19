import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const biker = {
  id: "01a0657e-133e-71a1-abd2-31a9abe215a9",
  type: "page-type/world-class",
  slug: "biker",
  title: "Biker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
