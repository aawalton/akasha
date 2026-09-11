import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const duelist = {
  id: "01a0657e-1358-7f6d-b1dd-ea4b02ef7fbf",
  type: "world-class",
  slug: "duelist",
  title: "Duelist",
  world: "the-wandering-inn",
  aliases: ["duelists"],
  references: "jsonl",
} as const satisfies WorldClass
