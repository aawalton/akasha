import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const senatorErrif = {
  id: "01a0b70c-f285-787b-846e-09d36812c957",
  type: "page-type/world-character",
  slug: "senator-errif",
  title: "Errif Jealwind",
  world: "world/the-wandering-inn",
  firstChapter: 763,
  lastChapter: 763,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
