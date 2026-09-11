import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const hairdresser = {
  id: "01a0657e-01ee-7abc-b715-89b61c8be45d",
  type: "world-class",
  slug: "hairdresser",
  title: "Hairdresser",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
