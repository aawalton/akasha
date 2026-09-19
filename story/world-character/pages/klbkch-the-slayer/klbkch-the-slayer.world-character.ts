import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const klbkchTheSlayer = {
  id: "01a0b70b-6dc7-7538-9a6e-15aece685343",
  type: "page-type/world-character",
  slug: "klbkch-the-slayer",
  title: "Klbkch",
  world: "world/the-wandering-inn",
  firstChapter: 113,
  lastChapter: 113,
  characterClaims: "jsonl",
  aliasOf: "world-character/klbkch",
} as const satisfies WorldCharacter
