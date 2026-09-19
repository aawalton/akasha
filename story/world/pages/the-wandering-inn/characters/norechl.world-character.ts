import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const norechl = {
  id: "01a0b70c-0d06-7b7e-b1c9-80443939e84d",
  type: "page-type/world-character",
  slug: "norechl",
  title: "Norechl",
  world: "world/the-wandering-inn",
  firstChapter: 577,
  lastChapter: 758,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
