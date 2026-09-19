import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const snooper = {
  id: "01a0657e-025a-7471-a2bf-ef4330c2a44e",
  type: "page-type/world-class",
  slug: "snooper",
  title: "Snooper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
