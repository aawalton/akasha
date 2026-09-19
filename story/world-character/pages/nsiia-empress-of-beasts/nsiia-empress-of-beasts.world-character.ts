import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nsiiaEmpressOfBeasts = {
  id: "01a0b70c-10c9-78c7-a878-088318dbb972",
  type: "page-type/world-character",
  slug: "nsiia-empress-of-beasts",
  title: "Nsiia",
  world: "world/the-wandering-inn",
  firstChapter: 577,
  lastChapter: 577,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
