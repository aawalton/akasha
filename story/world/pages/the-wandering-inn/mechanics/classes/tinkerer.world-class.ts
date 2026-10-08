import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tinkerer = {
  id: "01a0657e-026c-74b4-9085-7b3b25d5a16a",
  type: "page-type/world-class",
  slug: "tinkerer",
  title: "Tinkerer",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  aliases: ["tinkerers"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.108Z",
  updatedAt: "2026-09-22T13:30:22.000Z",
} as const satisfies WorldClass
