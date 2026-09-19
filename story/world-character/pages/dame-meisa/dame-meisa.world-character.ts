import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dameMeisa = {
  id: "01a0b70a-0fc3-7c0a-9a5e-08999cc21109",
  type: "page-type/world-character",
  slug: "dame-meisa",
  title: "Meisa",
  world: "world/the-wandering-inn",
  firstChapter: 539,
  lastChapter: 539,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
