import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const shamanUlcre = {
  id: "01a0b70c-fb15-788c-842c-05ed75c26398",
  type: "page-type/world-character",
  slug: "shaman-ulcre",
  title: "Shaman Ulcreziek",
  world: "world/the-wandering-inn",
  firstChapter: 521,
  lastChapter: 521,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
