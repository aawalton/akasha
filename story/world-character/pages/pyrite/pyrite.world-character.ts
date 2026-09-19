import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pyrite = {
  id: "01a0b70c-772f-7988-91c3-2c7ad9885000",
  type: "page-type/world-character",
  slug: "pyrite",
  title: "Pyrite",
  world: "world/the-wandering-inn",
  firstChapter: 155,
  lastChapter: 758,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
