import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordCaptain = {
  id: "01a0657e-0263-70fb-b0b7-81806345350f",
  type: "page-type/world-class",
  slug: "sword-captain",
  title: "Sword Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
