import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const khorpe = {
  id: "01a0b70b-69b9-7ce7-a593-ff1b24a63d62",
  type: "page-type/world-character",
  slug: "khorpe",
  title: "Major Khorpe",
  world: "world/the-wandering-inn",
  firstChapter: 662,
  lastChapter: 681,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
