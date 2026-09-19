import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const isceil = {
  id: "01a0b70b-132f-74e2-b75e-4086b5e68b50",
  type: "page-type/world-character",
  slug: "isceil",
  title: "Isceil",
  world: "world/the-wandering-inn",
  firstChapter: 374,
  lastChapter: 385,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
