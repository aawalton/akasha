import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wyvernLordFrost = {
  id: "01a0b70d-a230-742e-aaba-bcbb0fb286cc",
  type: "page-type/world-character",
  slug: "wyvern-lord-frost",
  title: "the Frost Wyvern Lord",
  world: "world/the-wandering-inn",
  firstChapter: 718,
  lastChapter: 718,
  characterClaims: "jsonl",
  aliasOf: "world-character/wyvern-lord",
} as const satisfies WorldCharacter
