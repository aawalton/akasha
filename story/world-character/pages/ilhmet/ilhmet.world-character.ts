import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ilhmet = {
  id: "01a0b70b-07fc-7a68-8222-3807cf08995e",
  type: "page-type/world-character",
  slug: "ilhmet",
  title: "Ilhmet",
  world: "world/the-wandering-inn",
  firstChapter: 323,
  lastChapter: 323,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
