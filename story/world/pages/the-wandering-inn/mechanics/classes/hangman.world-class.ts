import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hangman = {
  id: "01a0657e-01ee-7f50-8b6a-626dc9391ed2",
  type: "page-type/world-class",
  slug: "hangman",
  title: "Hangman",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.982Z",
  updatedAt: "2026-09-22T13:29:12.000Z",
} as const satisfies WorldClass
