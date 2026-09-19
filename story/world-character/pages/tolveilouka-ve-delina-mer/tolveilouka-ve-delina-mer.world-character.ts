import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tolveiloukaVeDelinaMer = {
  id: "01a0b70d-69c5-7724-9639-d5a502c79c89",
  type: "page-type/world-character",
  slug: "tolveilouka-ve-delina-mer",
  title: "Tolveilouka Ve'delina Mer",
  world: "world/the-wandering-inn",
  firstChapter: 506,
  lastChapter: 506,
  characterClaims: "jsonl",
  aliasOf: "world-character/tolveilouka",
} as const satisfies WorldCharacter
