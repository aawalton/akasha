import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const guildmasterOfMagic = {
  id: "01a0657e-01ed-7f88-8e1b-e963cabbf3c2",
  type: "page-type/world-class",
  slug: "guildmaster-of-magic",
  title: "Guildmaster of Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
