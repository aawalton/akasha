import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mihaela = {
  id: "01a0b70b-eb2f-775c-b084-7f201f17ebc2",
  type: "page-type/world-character",
  slug: "mihaela",
  title: "Mihaela Godfrey",
  world: "world/the-wandering-inn",
  firstChapter: 616,
  lastChapter: 664,
  characterClaims: "jsonl",
  aliasOf: "world-character/mihaela-godfrey",
} as const satisfies WorldCharacter
