import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shaman = {
  id: "01a0657e-0252-7463-9375-bccbdb8c422d",
  type: "page-type/world-class",
  slug: "shaman",
  title: "Shaman",
  world: "world/the-wandering-inn",
  appearanceCount: 193,
  aliases: ["shamans"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.082Z",
  updatedAt: "2026-09-22T13:29:59.000Z",
} as const satisfies WorldClass
