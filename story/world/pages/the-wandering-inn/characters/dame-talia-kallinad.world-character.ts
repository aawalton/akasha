import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const dameTaliaKallinad = {
  id: "01a0b70a-1038-78e6-acb5-cc8484db9c7c",
  type: "page-type/world-character",
  slug: "dame-talia-kallinad",
  title: "Dame Talia Kallinad",
  world: "world/the-wandering-inn",
  firstChapter: 490,
  lastChapter: 490,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
