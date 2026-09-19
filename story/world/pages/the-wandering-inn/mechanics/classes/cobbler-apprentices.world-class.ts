import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cobblerApprentices = {
  id: "01a0657e-01c7-7f0b-a647-2ecf296538ea",
  type: "page-type/world-class",
  slug: "cobbler-apprentices",
  title: "Cobbler Apprentices",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
