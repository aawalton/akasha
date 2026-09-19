import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zeladona = {
  id: "01a0b70d-ea2d-7932-8e73-415f7388d29e",
  type: "page-type/world-character",
  slug: "zeladona",
  title: "Zeladona Ischen",
  world: "world/the-wandering-inn",
  firstChapter: 630,
  lastChapter: 680,
  characterClaims: "jsonl",
  aliasOf: "world-character/zeladona-ischen",
} as const satisfies WorldCharacter
