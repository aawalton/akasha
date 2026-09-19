import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const maran = {
  id: "01a0b70b-99cd-7cf3-b296-957b6801a4d7",
  type: "page-type/world-character",
  slug: "maran",
  title: "Maran",
  world: "world/the-wandering-inn",
  firstChapter: 189,
  lastChapter: 192,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
