import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const banditLords = {
  id: "01a0657e-1338-7c99-9bc6-f2b5657f480b",
  type: "page-type/world-class",
  slug: "bandit-lords",
  title: "Bandit Lords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
