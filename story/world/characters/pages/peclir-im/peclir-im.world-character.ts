import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const peclirIm = {
  id: "01a0b70c-258a-7519-b9a4-45bb74cf6b52",
  type: "page-type/world-character",
  slug: "peclir-im",
  title: "Peclir Im",
  world: "world/the-wandering-inn",
  firstChapter: 207,
  lastChapter: 576,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
