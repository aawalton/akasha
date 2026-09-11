import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const lover = {
  id: "01a0657e-1391-752b-8411-cebc4787c49a",
  type: "world-class",
  slug: "lover",
  title: "Lover",
  world: "the-wandering-inn",
  aliases: ["lovers"],
  references: "jsonl",
} as const satisfies WorldClass
