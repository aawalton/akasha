import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nsiia = {
  id: "01a0b70c-108e-7358-8069-6d3da9787173",
  type: "page-type/world-character",
  slug: "nsiia",
  title: "Nsiia",
  world: "world/the-wandering-inn",
  firstChapter: 326,
  lastChapter: 554,
  characterClaims: "jsonl",
  aliasOf: "world-character/nsiia-oliphant",
} as const satisfies WorldCharacter
