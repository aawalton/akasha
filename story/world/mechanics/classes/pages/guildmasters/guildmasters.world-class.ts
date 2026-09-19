import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const guildmasters = {
  id: "01a0657e-01ed-7b60-9826-2f4bdca8b600",
  type: "page-type/world-class",
  slug: "guildmasters",
  title: "Guildmasters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
