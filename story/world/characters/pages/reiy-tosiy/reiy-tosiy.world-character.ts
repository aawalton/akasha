import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const reiyTosiy = {
  id: "01a0b70c-8d52-7330-a851-d7677d41c38f",
  type: "page-type/world-character",
  slug: "reiy-tosiy",
  title: "Reiy-Tosiy",
  world: "world/the-wandering-inn",
  firstChapter: 797,
  lastChapter: 797,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
