import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const onieva = {
  id: "01a0b70c-18ad-73d5-b7cd-47190bac95b9",
  type: "page-type/world-character",
  slug: "onieva",
  title: "Onieva",
  world: "world/the-wandering-inn",
  firstChapter: 441,
  lastChapter: 793,
  characterClaims: "jsonl",
  aliasOf: "world-character/onieva-oliwing",
} as const satisfies WorldCharacter
