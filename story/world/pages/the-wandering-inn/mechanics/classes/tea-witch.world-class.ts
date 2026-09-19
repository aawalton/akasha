import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const teaWitch = {
  id: "01a0657e-0269-7ed7-b74f-dc66b35fc5b5",
  type: "page-type/world-class",
  slug: "tea-witch",
  title: "Tea Witch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
