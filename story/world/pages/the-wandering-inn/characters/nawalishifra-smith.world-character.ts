import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nawalishifraSmith = {
  id: "01a0b70c-039b-7155-ad98-877692a50330",
  type: "page-type/world-character",
  slug: "nawalishifra-smith",
  title: "Nawalishifra",
  world: "world/the-wandering-inn",
  firstChapter: 559,
  lastChapter: 559,
  characterClaims: "jsonl",
  aliasOf: "world-character/nawalishifra-tannousin",
} as const satisfies WorldCharacter
