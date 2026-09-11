import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const shaman = {
  id: "01a0657e-0252-7463-9375-bccbdb8c422d",
  type: "world-class",
  slug: "shaman",
  title: "Shaman",
  world: "the-wandering-inn",
  aliases: ["shamans"],
  references: "jsonl",
} as const satisfies WorldClass
