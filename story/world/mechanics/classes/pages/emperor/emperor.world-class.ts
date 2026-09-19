import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const emperor = {
  id: "01a0657e-135f-7588-ae60-812d16b84af0",
  type: "page-type/world-class",
  slug: "emperor",
  title: "Emperor",
  world: "world/the-wandering-inn",
  aliases: ["emperors"],
  references: "jsonl",
} as const satisfies WorldClass
