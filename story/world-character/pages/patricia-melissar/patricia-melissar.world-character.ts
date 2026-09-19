import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const patriciaMelissar = {
  id: "01a0b70c-20f7-7e94-90a6-79623ea3531e",
  type: "page-type/world-character",
  slug: "patricia-melissar",
  title: "Patricia Melissar",
  world: "world/the-wandering-inn",
  firstChapter: 338,
  lastChapter: 338,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
