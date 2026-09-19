import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const guildmaster = {
  id: "01a0657e-1370-74e1-b7ae-3c951ed862a6",
  type: "page-type/world-class",
  slug: "guildmaster",
  title: "Guildmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
