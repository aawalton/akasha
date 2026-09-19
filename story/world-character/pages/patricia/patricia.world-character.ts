import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const patricia = {
  id: "01a0b70c-20be-7721-9b6c-cf7a7ff27377",
  type: "page-type/world-character",
  slug: "patricia",
  title: "Patricia",
  world: "world/the-wandering-inn",
  firstChapter: 183,
  lastChapter: 183,
  characterClaims: "jsonl",
  aliasOf: "world-character/patricia-melissar",
} as const satisfies WorldCharacter
