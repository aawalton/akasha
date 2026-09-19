import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gangMastermind = {
  id: "01a0657e-1366-736b-891b-b861b7fc629a",
  type: "page-type/world-class",
  slug: "gang-mastermind",
  title: "Gang Mastermind",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
