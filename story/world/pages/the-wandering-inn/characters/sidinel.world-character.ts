import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sidinel = {
  id: "01a0b70c-ff6e-7196-8482-b8894c9eb2fa",
  type: "page-type/world-character",
  slug: "sidinel",
  title: "Sidinel",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 436,
  lastChapter: 436,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
