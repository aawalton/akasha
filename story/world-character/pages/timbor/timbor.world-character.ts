import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const timbor = {
  id: "01a0b70d-6477-7278-9a7e-f058cb82d2f4",
  type: "page-type/world-character",
  slug: "timbor",
  title: "Timbor Parthian",
  world: "world/the-wandering-inn",
  firstChapter: 498,
  lastChapter: 498,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
