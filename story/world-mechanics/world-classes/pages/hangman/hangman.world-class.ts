import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const hangman = {
  id: "01a0657e-01ee-7f50-8b6a-626dc9391ed2",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "hangman",
  title: "Hangman",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
