import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const maviola = {
  id: "01a0b70b-dfe0-7224-831f-141a5245440b",
  type: "page-type/world-character",
  slug: "maviola",
  title: "Maviola",
  world: "world/the-wandering-inn",
  firstChapter: 419,
  lastChapter: 770,
  characterClaims: "jsonl",
  aliasOf: "world-character/maviola-el",
} as const satisfies WorldCharacter
