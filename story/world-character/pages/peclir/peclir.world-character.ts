import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const peclir = {
  id: "01a0b70c-2551-74b0-8d70-cafd46363e87",
  type: "page-type/world-character",
  slug: "peclir",
  title: "Peclir Im",
  world: "world/the-wandering-inn",
  firstChapter: 575,
  lastChapter: 575,
  characterClaims: "jsonl",
  aliasOf: "world-character/peclir-im",
} as const satisfies WorldCharacter
