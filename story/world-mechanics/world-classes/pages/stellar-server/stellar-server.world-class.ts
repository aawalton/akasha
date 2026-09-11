import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const stellarServer = {
  id: "01a06586-0a53-7727-9490-c8e19da13560",
  type: "world-class",
  slug: "stellar-server",
  title: "Stellar Server",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
