import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const colfa = {
  id: "01a0b70a-046e-7973-812c-97942c89918c",
  type: "page-type/world-character",
  slug: "colfa",
  title: "Colfa",
  world: "world/the-wandering-inn",
  firstChapter: 312,
  lastChapter: 763,
  characterClaims: "jsonl",
  aliasOf: "world-character/colfa-val-lischelle-drakle",
} as const satisfies WorldCharacter
