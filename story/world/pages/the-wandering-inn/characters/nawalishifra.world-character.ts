import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nawalishifra = {
  id: "01a0b70c-0362-742f-92cc-59ca323c455c",
  type: "page-type/world-character",
  slug: "nawalishifra",
  title: "Nawalishifra Tannousin",
  world: "world/the-wandering-inn",
  firstChapter: 249,
  lastChapter: 797,
  characterClaims: "jsonl",
  aliasOf: "world-character/nawalishifra-tannousin",
} as const satisfies WorldCharacter
