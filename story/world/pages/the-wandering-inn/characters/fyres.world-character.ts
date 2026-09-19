import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fyres = {
  id: "01a0b70a-8e6b-71ff-9dda-da777929e975",
  type: "page-type/world-character",
  slug: "fyres",
  title: "Fyres",
  world: "world/the-wandering-inn",
  firstChapter: 606,
  lastChapter: 606,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
