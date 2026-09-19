import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const glideclaw = {
  id: "01a0b70a-9f50-7b79-bde8-978a2b366a29",
  type: "page-type/world-character",
  slug: "glideclaw",
  title: "Glideclaw",
  world: "world/the-wandering-inn",
  firstChapter: 817,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
