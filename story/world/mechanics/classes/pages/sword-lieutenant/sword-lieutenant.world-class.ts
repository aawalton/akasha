import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordLieutenant = {
  id: "01a0657e-0263-7f5f-ba57-5440b6cd4c46",
  type: "page-type/world-class",
  slug: "sword-lieutenant",
  title: "Sword Lieutenant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
