import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gourmet = {
  id: "01a0657e-136d-7441-936c-0e49c6bb9872",
  type: "page-type/world-class",
  slug: "gourmet",
  title: "Gourmet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
