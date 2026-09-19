import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const admirals = {
  id: "01a0657e-01a4-7a53-adc4-e5a16deeae8a",
  type: "page-type/world-class",
  slug: "admirals",
  title: "Admirals",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
