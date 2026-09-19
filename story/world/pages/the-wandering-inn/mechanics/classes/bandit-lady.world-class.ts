import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const banditLady = {
  id: "01a0657e-1337-7697-a94c-1c222d5eac88",
  type: "page-type/world-class",
  slug: "bandit-lady",
  title: "Bandit Lady",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
