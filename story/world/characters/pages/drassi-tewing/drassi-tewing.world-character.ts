import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const drassiTewing = {
  id: "01a0b70a-1e45-7814-aaa1-0457d4145354",
  type: "page-type/world-character",
  slug: "drassi-tewing",
  title: "Drassi Tewing",
  world: "world/the-wandering-inn",
  firstChapter: 440,
  lastChapter: 599,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
