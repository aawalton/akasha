import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const singer = {
  id: "01a0657e-0255-75fd-bc9d-0113e66452f8",
  type: "world-class",
  slug: "singer",
  title: "Singer",
  world: "the-wandering-inn",
  aliases: ["singers"],
  references: "jsonl",
} as const satisfies WorldClass
