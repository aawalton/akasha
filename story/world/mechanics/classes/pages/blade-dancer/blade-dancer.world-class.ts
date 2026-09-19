import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bladeDancer = {
  id: "01a0657e-01bc-7f87-a0b3-534aed71aba5",
  type: "page-type/world-class",
  slug: "blade-dancer",
  title: "Blade Dancer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
