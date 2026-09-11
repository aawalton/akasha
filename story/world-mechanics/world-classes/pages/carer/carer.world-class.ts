import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const carer = {
  id: "01a0657e-1346-7a27-8d7e-98f3b97dde3b",
  type: "world-class",
  slug: "carer",
  title: "Carer",
  world: "the-wandering-inn",
  aliases: ["carers"],
  references: "jsonl",
} as const satisfies WorldClass
