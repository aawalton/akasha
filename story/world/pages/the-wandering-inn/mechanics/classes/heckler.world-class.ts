import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const heckler = {
  id: "01a0657e-1372-7514-ae21-ce41ad015365",
  type: "page-type/world-class",
  slug: "heckler",
  title: "Heckler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
