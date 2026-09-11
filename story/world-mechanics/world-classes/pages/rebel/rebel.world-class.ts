import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const rebel = {
  id: "01a0657e-0244-7309-a304-9204049c21a1",
  type: "world-class",
  slug: "rebel",
  title: "Rebel",
  world: "the-wandering-inn",
  aliases: ["rebels"],
  references: "jsonl",
} as const satisfies WorldClass
