import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const engineer = {
  id: "01a0657e-1360-74f9-8086-5d9a7b738d4b",
  type: "page-type/world-class",
  slug: "engineer",
  title: "Engineer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
