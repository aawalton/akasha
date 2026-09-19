import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const herdmistressGeraeri = {
  id: "01a0b70a-f949-7c94-9ad4-1501870061e2",
  type: "page-type/world-character",
  slug: "herdmistress-geraeri",
  title: "Herdmistress Geraeri",
  world: "world/the-wandering-inn",
  firstChapter: 624,
  lastChapter: 624,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
