import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const apprentice = {
  id: "01a0657e-132d-79b0-83e6-a78f3ffa6667",
  type: "page-type/world-class",
  slug: "apprentice",
  title: "Apprentice",
  world: "world/the-wandering-inn",
  appearanceCount: 20,
  aliases: ["apprentices"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.397Z",
  updatedAt: "2026-09-22T13:28:25.000Z",
} as const satisfies WorldClass
