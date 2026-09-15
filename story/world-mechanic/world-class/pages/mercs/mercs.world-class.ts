import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const mercs = {
  id: "01a0657e-13a2-735b-9e5f-34ec51b69720",
  type: "world-class",
  slug: "mercs",
  title: "Mercs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
