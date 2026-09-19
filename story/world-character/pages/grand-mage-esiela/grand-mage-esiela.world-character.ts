import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const grandMageEsiela = {
  id: "01a0b70a-e904-7263-a9a0-d3cb609a625c",
  type: "page-type/world-character",
  slug: "grand-mage-esiela",
  title: "Esiela",
  world: "world/the-wandering-inn",
  firstChapter: 410,
  lastChapter: 410,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
