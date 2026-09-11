import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const guildmasters = {
  id: "01a0657e-01ed-7b60-9826-2f4bdca8b600",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "guildmasters",
  title: "Guildmasters",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
