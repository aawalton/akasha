import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const writer = {
  id: "01a06586-0a84-7bcc-911c-404bef448211",
  type: "world-class",
  slug: "writer",
  title: "Writer",
  world: "the-wandering-inn",
  aliases: ["writers"],
  references: "jsonl",
} as const satisfies WorldClass
