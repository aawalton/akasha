import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const duelist = {
  id: "01a0657e-1358-7f6d-b1dd-ea4b02ef7fbf",
  type: "page-type/world-class",
  slug: "duelist",
  title: "Duelist",
  world: "world/the-wandering-inn",
  aliases: ["duelists"],
  references: "jsonl",
} as const satisfies WorldClass
