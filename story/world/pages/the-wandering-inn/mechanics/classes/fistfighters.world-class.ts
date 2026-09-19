import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fistfighters = {
  id: "01a0657e-1365-7f86-bf08-2adb3b8bb319",
  type: "page-type/world-class",
  slug: "fistfighters",
  title: "Fistfighters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
