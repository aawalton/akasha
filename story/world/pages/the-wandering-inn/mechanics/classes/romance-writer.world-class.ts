import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const romanceWriter = {
  id: "01a0657e-0248-7eb7-adc0-e61b710a4cd8",
  type: "page-type/world-class",
  slug: "romance-writer",
  title: "Romance Writer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
