import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const exile = {
  id: "01a0657e-01d9-7ed9-858c-6c18636aaa68",
  type: "page-type/world-class",
  slug: "exile",
  title: "Exile",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
