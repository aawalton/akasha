import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordTender = {
  id: "01a0657e-0263-7f7b-a7b8-f98c00eeb933",
  type: "page-type/world-class",
  slug: "sword-tender",
  title: "Sword Tender",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
