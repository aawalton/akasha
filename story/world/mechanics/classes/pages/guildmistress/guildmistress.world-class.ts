import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const guildmistress = {
  id: "01a0657e-1370-7d7a-bff6-bde8a606b0f6",
  type: "page-type/world-class",
  slug: "guildmistress",
  title: "Guildmistress",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
