import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordmage = {
  id: "01a0657e-0263-71e8-b22a-1780ff52a7f4",
  type: "page-type/world-class",
  slug: "swordmage",
  title: "Swordmage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
