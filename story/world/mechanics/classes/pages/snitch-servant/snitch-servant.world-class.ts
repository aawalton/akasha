import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const snitchServant = {
  id: "01a06586-0a45-7757-aa60-fb46320d185e",
  type: "page-type/world-class",
  slug: "snitch-servant",
  title: "Snitch Servant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
