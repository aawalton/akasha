import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const velanTheKind = {
  id: "01a0b70d-8a9d-799c-b7c7-c11e9138fabb",
  type: "page-type/world-character",
  slug: "velan-the-kind",
  title: "Velan the Kind",
  world: "world/the-wandering-inn",
  firstChapter: 152,
  lastChapter: 236,
  characterClaims: "jsonl",
  aliasOf: "world-character/velan",
} as const satisfies WorldCharacter
