import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const huntingLady = {
  id: "01a0657e-01fa-7735-8485-1d0f54e8caaa",
  type: "page-type/world-class",
  slug: "hunting-lady",
  title: "Hunting Lady",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
